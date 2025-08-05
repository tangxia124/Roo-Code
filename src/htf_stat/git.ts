import { spawn } from "child_process"
import moment from "moment";
import * as vscode from "vscode"
import * as os from "os"

import { commitUrl, ROO_CODE_EXTENSION_NAME, submitUrl, TWINNY_EXTENSION_NAME } from "./constants"

const spawnAsync = (command: string, args: string[], options: any) =>
    new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
        const child = spawn(command, args, {
            ...options,
            shell: process.platform === 'win32',
            windowsHide: true
        });
        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data) => stdout += data);
        child.stderr.on('data', (data) => stderr += data);

        child.on('error', reject);
        child.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Process exited with code ${code}: ${stderr}`));
            } else {
                resolve({ stdout, stderr });
            }
        });
    });


async function saveStatData(saveData: ChangeStats[]): Promise<void> {
    let project = ""
    const workspaceFolders = vscode.workspace.workspaceFolders
    if (workspaceFolders && workspaceFolders.length > 0) {
        project = workspaceFolders[0].name
    }
    const localVersion = vscode.extensions.getExtension("tangxia.roo-code-ex")?.packageJSON.version as string

    const formatDate = saveData.map(data => ({
        username: getUsername(),
        project: project,
        branch: data.branch,
        commit: data.commitId,
        commitTime: data.commitTime,
        submitLineNum: data.committedChanges,
        requestTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        version: localVersion
    }))

    if (formatDate.length > 0) {
        fetch(submitUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formatDate)
        })
    }
}

interface ChangeStats {
    committedChanges: number
    branch: string
    commitId: string
    commitTime: string
}

async function getCommitDiff(commits: string[]): Promise<number> {
    try {
        const username = getUsername()
        const workspace = getWorkspacePath()
        const { stdout } = await spawnAsync('git', [
            'show',
            ...commits,
            '--format=format:',
            '--shortstat',
            '--first-parent',
            '--no-merges',
            `--author=${username}`
        ], {
            cwd: workspace,
            encoding: 'utf8'
        }
        )

        const statRegex = /(\d+)\s+insertion/g

        let total = 0
        let match: RegExpExecArray | null

        while ((match = statRegex.exec(stdout)) !== null) {
            total += parseInt(match[1] || "0")
        }

        return total
    } catch (error) {
        console.error(`Commit差异比较失败 ${commits.join("..")}:`, error)
        return 0
    }
}

async function getCommitTime(commit: string): Promise<string> {
    try {
        const workspace = getWorkspacePath()
        const { stdout } = await spawnAsync('git', [
            'show',
            commit,
            `--format="%cd"`,
            `--date=format:"%Y-%m-%d %H:%M:%S"`,
            "--no-patch"
        ], {
            cwd: workspace,
            encoding: 'utf8'
        }
        )
        return stdout.replace(/['"]+/g, '').trim()
    } catch (error) {
        console.error(`getCommitTime失败 ${commit}:`, error)
        return ""
    }
}

export async function executeDailyStat() {
    const isInstalled = await checkGitInstalled()
    if (!isInstalled) {
        return
    }

    const isRepo = await checkGitRepo()
    if (!isRepo) {
        return
    }

    let project = ""
    const workspaceFolders = vscode.workspace.workspaceFolders
    if (workspaceFolders && workspaceFolders.length > 0) {
        project = workspaceFolders[0].name
    }

    try {
        const branches = await getLocalBranches()

        const historyResponse = await fetch(commitUrl + `?username=${getUsername()}`)
        const responseData = await historyResponse.json();
        const historyMap = new Map<string, string>(Object.entries(responseData));

        const isFirstRun = historyMap.size === 0
        const username = getUsername()
        const workspace = getWorkspacePath()
        const saveData = [] as ChangeStats[]

        for (const branch of branches) {
            try {
                const { stdout } = await spawnAsync('git', [
                    'log',
                    `--format="%H %ad"`,
                    `--date=format:"%Y-%m-%d %H:%M:%S"`,
                    '-n1',
                    '--first-parent',
                    '--no-merges',
                    `--author=${username}`,
                    branch
                ], {
                    cwd: workspace,
                    encoding: 'utf8'
                }
                )
                const commitInfo = stdout.replace(/['"]+/g, '').trim().split(" ")
                if (commitInfo.length !== 3) continue

                const key = `${project}:${branch}`
                const keyCommit = historyMap.get(key)

                if (isFirstRun || !keyCommit) {
                    const diffNum = await getCommitDiff([commitInfo[0]])
                    saveData.push({ committedChanges: diffNum, branch: branch, commitId: commitInfo[0], commitTime: commitInfo[1] + " " + commitInfo[2] })
                } else if (keyCommit !== commitInfo[0]) {
                    const commitHashes = await getCommitHashes(
                        keyCommit,
                        commitInfo[0],
                        branch
                    )

                    for (const hash of commitHashes) {
                        const diffNum = await getCommitDiff([hash])
                        const commitTime = await getCommitTime(hash)
                        saveData.push({ committedChanges: diffNum, branch: branch, commitId: hash, commitTime: commitTime })
                    }
                }

            } catch (error) {
                console.error(`[project:${project} branch:${branch}] 统计失败:`, error)
            }
        }
        if (saveData.length > 0) {
            await saveStatData(saveData)
        }
    } catch (error) {
        console.error("每日统计任务失败:", error)
    }
}

async function getCommitHashes(
    baseHash: string,
    targetHash: string,
    branch: string
): Promise<string[]> {
    try {
        const username = getUsername()
        const workspace = getWorkspacePath()
        const { stdout } = await spawnAsync('git', [
            'log',
            `${baseHash}..${targetHash}`,
            '--format=%H',
            '--first-parent',
            '--no-merges',
            `--author=${username}`,
            branch
        ], {
            cwd: workspace,
            encoding: 'utf8'
        }
        )
        return stdout.trim().split(/\r?\n/).filter(Boolean)
    } catch (error) {
        console.error(`获取commit hash列表失败 ${baseHash}..${targetHash}:`, error)
        return []
    }
}

async function checkGitRepo(): Promise<boolean> {
    try {
        const cwd = getWorkspacePath()
        await spawnAsync('git', ['rev-parse', '--git-dir'], { cwd })
        return true
    } catch (error) {
        return false
    }
}

async function checkGitInstalled(): Promise<boolean> {
    try {
        const workspace = getWorkspacePath()
        await spawnAsync('git', ['--version'], { cwd: workspace })
        return true
    } catch (error) {
        return false
    }
}

function getUsername(): string | undefined {
    const twinnyConfig = vscode.workspace.getConfiguration(TWINNY_EXTENSION_NAME);
    const rooCodeConfig = vscode.workspace.getConfiguration(ROO_CODE_EXTENSION_NAME);
    return rooCodeConfig.get('username') || twinnyConfig.get('username') || os.userInfo().username || "unknown user";
}

export const getWorkspacePath = (defaultCwdPath = "") => {
    const cwdPath =
        vscode.workspace.workspaceFolders
            ?.map((folder) => folder.uri.fsPath)
            .at(0) || defaultCwdPath
    const currentFileUri = vscode.window.activeTextEditor?.document.uri
    if (currentFileUri) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(currentFileUri)
        return workspaceFolder?.uri.fsPath || cwdPath
    }
    return cwdPath
}

export async function getLocalBranches(): Promise<string[]> {
    try {
        const workspace = getWorkspacePath()
        const { stdout } = await spawnAsync('git', [
            'for-each-ref',
            `--format="%(refname:short)"`,
            'refs/heads/'
        ], { cwd: workspace, encoding: 'utf8' })
        return stdout.replace(/['"]+/g, '').trim().split(/\r?\n/).filter(Boolean)
    } catch (error) {
        console.error("Failed to get local branches:", error)
        return []
    }
}
