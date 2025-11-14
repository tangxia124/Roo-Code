// npx vitest run src/components/chat/__tests__/FeedbackDialog.spec.tsx

import React from "react"
import { render, screen, fireEvent } from "@/utils/test-utils"
import { vi } from "vitest"

import { FeedbackDialog } from "../FeedbackDialog"

// Mock the vscode utility
vi.mock("@/utils/vscode", () => ({
	vscode: {
		postMessage: vi.fn(),
	},
}))

// Mock the translation context
vi.mock("@src/i18n/TranslationContext", () => ({
	useAppTranslation: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				"chat:taskFeedback.dialogTitle": "Submit Feedback",
				"chat:taskFeedback.dialogDescription": "Please provide your feedback about this task",
				"chat:taskFeedback.placeholder": "Enter your feedback here...",
				"chat:taskFeedback.submit": "Submit",
				"chat:taskFeedback.submitting": "Submitting...",
				"chat:taskFeedback.cancel": "Cancel",
			}
			return translations[key] || key
		},
	}),
}))

import { vscode } from "@/utils/vscode"

const mockPostMessage = vi.mocked(vscode.postMessage)

describe("FeedbackDialog", () => {
	const defaultProps = {
		open: true,
		onOpenChange: vi.fn(),
		taskId: "test-task-id",
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe("Basic Rendering", () => {
		it("renders dialog with correct elements", () => {
			render(<FeedbackDialog {...defaultProps} />)

			expect(screen.getByText("Submit Feedback")).toBeInTheDocument()
			expect(screen.getByText("Please provide your feedback about this task")).toBeInTheDocument()
			expect(screen.getByPlaceholderText("Enter your feedback here...")).toBeInTheDocument()
			expect(screen.getByText("Submit")).toBeInTheDocument()
			expect(screen.getByText("Cancel")).toBeInTheDocument()
		})

		it("does not render when open is false", () => {
			render(<FeedbackDialog {...defaultProps} open={false} />)

			expect(screen.queryByText("Submit Feedback")).not.toBeInTheDocument()
			expect(screen.queryByText("Please provide your feedback about this task")).not.toBeInTheDocument()
		})
	})

	describe("User Interactions", () => {
		it("calls onOpenChange when cancel is clicked", () => {
			const onOpenChange = vi.fn()
			render(<FeedbackDialog {...defaultProps} onOpenChange={onOpenChange} />)

			fireEvent.click(screen.getByText("Cancel"))
			expect(onOpenChange).toHaveBeenCalledWith(false)
		})

		it("sends submitTaskFeedback message when submit is clicked", () => {
			const onOpenChange = vi.fn()
			render(<FeedbackDialog {...defaultProps} onOpenChange={onOpenChange} />)

			// Enter feedback text
			const textarea = screen.getByPlaceholderText("Enter your feedback here...")
			fireEvent.change(textarea, { target: { value: "This is a test feedback" } })

			// Submit feedback
			fireEvent.click(screen.getByText("Submit"))

			expect(mockPostMessage).toHaveBeenCalledWith({
				type: "submitTaskFeedback",
				text: "This is a test feedback",
			})
			expect(onOpenChange).toHaveBeenCalledWith(false)
		})

		it("calls onOpenChange when dialog is closed after submit", () => {
			const onOpenChange = vi.fn()
			render(<FeedbackDialog {...defaultProps} onOpenChange={onOpenChange} />)

			// Enter feedback text
			const textarea = screen.getByPlaceholderText("Enter your feedback here...")
			fireEvent.change(textarea, { target: { value: "Test feedback" } })

			// Submit feedback
			fireEvent.click(screen.getByText("Submit"))

			expect(onOpenChange).toHaveBeenCalledWith(false)
		})

		it("does not send message when feedback is empty", () => {
			const onOpenChange = vi.fn()
			render(<FeedbackDialog {...defaultProps} onOpenChange={onOpenChange} />)

			// Submit without entering any text
			fireEvent.click(screen.getByText("Submit"))

			expect(mockPostMessage).not.toHaveBeenCalled()
			expect(onOpenChange).not.toHaveBeenCalledWith(false)
		})

		it("does not send message when feedback is only whitespace", () => {
			const onOpenChange = vi.fn()
			render(<FeedbackDialog {...defaultProps} onOpenChange={onOpenChange} />)

			// Enter only whitespace
			const textarea = screen.getByPlaceholderText("Enter your feedback here...")
			fireEvent.change(textarea, { target: { value: "   " } })

			// Submit feedback
			fireEvent.click(screen.getByText("Submit"))

			expect(mockPostMessage).not.toHaveBeenCalled()
			expect(onOpenChange).not.toHaveBeenCalledWith(false)
		})

		it("does not send message when taskId is missing", () => {
			const onOpenChange = vi.fn()
			render(<FeedbackDialog {...defaultProps} onOpenChange={onOpenChange} taskId={undefined} />)

			// Enter feedback text
			const textarea = screen.getByPlaceholderText("Enter your feedback here...")
			fireEvent.change(textarea, { target: { value: "Test feedback" } })

			// Submit feedback
			fireEvent.click(screen.getByText("Submit"))

			expect(mockPostMessage).not.toHaveBeenCalled()
			expect(onOpenChange).not.toHaveBeenCalledWith(false)
		})
	})

	describe("Text Input Handling", () => {
		it("updates textarea value when user types", () => {
			render(<FeedbackDialog {...defaultProps} />)

			const textarea = screen.getByPlaceholderText("Enter your feedback here...") as HTMLTextAreaElement
			fireEvent.change(textarea, { target: { value: "This is my feedback" } })

			expect(textarea.value).toBe("This is my feedback")
		})

		it("clears textarea when dialog is reopened", () => {
			const onOpenChange = vi.fn()
			const { rerender } = render(<FeedbackDialog {...defaultProps} onOpenChange={onOpenChange} />)

			// Enter some text
			const textarea = screen.getByPlaceholderText("Enter your feedback here...") as HTMLTextAreaElement
			fireEvent.change(textarea, { target: { value: "This is my feedback" } })
			expect(textarea.value).toBe("This is my feedback")

			// Close dialog
			rerender(<FeedbackDialog {...defaultProps} onOpenChange={onOpenChange} open={false} />)

			// Reopen dialog
			rerender(<FeedbackDialog {...defaultProps} onOpenChange={onOpenChange} open={true} />)

			// Textarea should be cleared
			const newTextarea = screen.getByPlaceholderText("Enter your feedback here...") as HTMLTextAreaElement
			expect(newTextarea.value).toBe("")
		})
	})

	describe("Accessibility", () => {
		it("has proper ARIA labels and roles", () => {
			render(<FeedbackDialog {...defaultProps} />)

			expect(screen.getByRole("dialog")).toBeInTheDocument()
			expect(screen.getByRole("textbox")).toBeInTheDocument()
			expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
			expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
		})

		it("has proper labels and descriptions", () => {
			render(<FeedbackDialog {...defaultProps} />)

			const textarea = screen.getByRole("textbox")
			expect(textarea).toHaveAttribute("placeholder", "Enter your feedback here...")
		})
	})

	describe("Edge Cases", () => {
		it("handles very long feedback text", () => {
			render(<FeedbackDialog {...defaultProps} />)

			const longText = "a".repeat(1000)
			const textarea = screen.getByPlaceholderText("Enter your feedback here...") as HTMLTextAreaElement
			fireEvent.change(textarea, { target: { value: longText } })

			expect(textarea.value).toBe(longText)
		})

		it("handles special characters in feedback", () => {
			render(<FeedbackDialog {...defaultProps} />)

			const specialText = "Feedback with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?"
			const textarea = screen.getByPlaceholderText("Enter your feedback here...") as HTMLTextAreaElement
			fireEvent.change(textarea, { target: { value: specialText } })

			expect(textarea.value).toBe(specialText)
		})

		it("handles rapid button clicks", () => {
			const onOpenChange = vi.fn()
			render(<FeedbackDialog {...defaultProps} onOpenChange={onOpenChange} />)

			const textarea = screen.getByPlaceholderText("Enter your feedback here...")
			fireEvent.change(textarea, { target: { value: "Test feedback" } })

			const submitButton = screen.getByText("Submit")

			// Click button multiple times rapidly
			fireEvent.click(submitButton)
			fireEvent.click(submitButton)
			fireEvent.click(submitButton)

			// Should be called only once
			expect(mockPostMessage).toHaveBeenCalledTimes(1)
			expect(mockPostMessage).toHaveBeenCalledWith({
				type: "submitTaskFeedback",
				text: "Test feedback",
			})
		})
	})
})