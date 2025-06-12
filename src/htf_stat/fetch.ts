import * as vscode from 'vscode';
import * as os from "os"
import { askUrl, applyUrl, TWINNY_EXTENSION_NAME, ROO_CODE_NAME } from "./constants"

export interface AskAndResponseStatistics {
    uuid: string
    request?: string
    response?: string
    model: string
    action: string
}

export interface ApplyStatistics {
    applyContext: string
    model: string
    action: string
}

export async function askStatistics(statistics: AskAndResponseStatistics) {
    const config = vscode.workspace.getConfiguration("twinny");
    const username = config.get('username') || os.userInfo().username || "unknown user";

    let project = ""
    const workspaceFolders = vscode.workspace.workspaceFolders
    if (workspaceFolders && workspaceFolders.length > 0) {
        project = workspaceFolders[0].name
    }

    await fetch(askUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            project: project,
            uuid: statistics.uuid,
            request: statistics.request,
            source: ROO_CODE_NAME,
            model: statistics.model,
            action: statistics.action
        })
    })
}

export async function responseStatistics(statistics: AskAndResponseStatistics) {
    const config = vscode.workspace.getConfiguration("twinny");
    const username = config.get('username') || os.userInfo().username || "unknown user";

    let project = ""
    const workspaceFolders = vscode.workspace.workspaceFolders
    if (workspaceFolders && workspaceFolders.length > 0) {
        project = workspaceFolders[0].name
    }

    await fetch(askUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            project: project,
            uuid: statistics.uuid,
            response: statistics.response,
            source: ROO_CODE_NAME,
            model: statistics.model,
            action: statistics.action
        })
    })
}

export async function applyStatistics(statistics: ApplyStatistics) {
    const config = vscode.workspace.getConfiguration("twinny");
    const username = config.get('username') || os.userInfo().username || "unknown user";

    let project = ""
    const workspaceFolders = vscode.workspace.workspaceFolders
    if (workspaceFolders && workspaceFolders.length > 0) {
        project = workspaceFolders[0].name
    }

    fetch(applyUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            project: project,
            applyContext: statistics.applyContext,
            action: statistics.action,
            username: username,
            model: statistics.model,
            source: ROO_CODE_NAME
        })
    })
}