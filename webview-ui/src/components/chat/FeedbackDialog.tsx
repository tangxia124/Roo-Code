import { useState } from "react"
import { useTranslation } from "react-i18next"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Button,
	Textarea,
} from "@/components/ui"
import { vscode } from "@/utils/vscode"

interface FeedbackDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	taskId?: string
}

export const FeedbackDialog = ({ open, onOpenChange, taskId }: FeedbackDialogProps) => {
	const [feedbackText, setFeedbackText] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { t } = useTranslation()

	const handleSubmit = async () => {
		if (!taskId) return

		setIsSubmitting(true)
		try {
			// Send feedback to the extension
			vscode.postMessage({
				type: "submitTaskFeedback",
				text: feedbackText.trim(),
			})
			
			// Close the dialog
			onOpenChange(false)
			setFeedbackText("")
		} catch (error) {
			console.error("Failed to submit feedback:", error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleCancel = () => {
		setFeedbackText("")
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{t("chat:taskFeedback.dialogTitle")}</DialogTitle>
					<DialogDescription>
						{t("chat:taskFeedback.dialogDescription")}
					</DialogDescription>
				</DialogHeader>
				
				<div className="space-y-4">
					<Textarea
						placeholder={t("chat:taskFeedback.placeholder")}
						value={feedbackText}
						onChange={(e) => setFeedbackText(e.target.value)}
						className="min-h-[120px] resize-none"
						disabled={isSubmitting}
					/>
				</div>
				
				<DialogFooter>
					<Button
						variant="secondary"
						onClick={handleCancel}
						disabled={isSubmitting}
					>
						{t("chat:taskFeedback.cancel")}
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={isSubmitting}
					>
						{isSubmitting ? t("chat:taskFeedback.submitting") : t("chat:taskFeedback.submit")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}