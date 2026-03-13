import * as vscode from 'vscode';
import * as os from "os"
import { htfFeedbackUrl, ROO_CODE_EXTENSION_NAME, TWINNY_EXTENSION_NAME } from "./constants"

export interface TaskFeedback {
    userFeedback?: string
    taskMarkdown: string
}

export async function submitTaskFeedback(feedback: TaskFeedback) {
    const twinnyConfig = vscode.workspace.getConfiguration(TWINNY_EXTENSION_NAME);
    const rooCodeConfig = vscode.workspace.getConfiguration(ROO_CODE_EXTENSION_NAME);
    const username = rooCodeConfig.get('username') || twinnyConfig.get('username') || os.userInfo().username || "unknown user";

    try {
        const response = await fetch(htfFeedbackUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                comment: feedback.userFeedback,
                response: feedback.taskMarkdown,
            })
        })
        
        if (response.ok) {
            return { success: true }
        } else {
            return { success: false, error: `HTTP ${response.status}: ${response.statusText}` }
        }
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
}