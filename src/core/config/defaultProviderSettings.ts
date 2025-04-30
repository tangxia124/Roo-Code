export const DEFAULT_PROVIDER_SETTINGS = `
{
  "providerProfiles": {
    "currentApiConfigName": "htf_default",
    "apiConfigs": {
      "htf_default": {
        "apiProvider": "openai",
        "apiModelId": "DeepSeek-R1-671B",
        "openAiBaseUrl": "http://llm.htffund.com/v1",
        "openAiApiKey": "sk-iLiWSbLYunZDVpHVyZrmuA",
        "openAiR1FormatEnabled": true,
        "openAiModelId": "DeepSeek-R1-671B",
        "openAiCustomModelInfo": {
          "maxTokens": -1,
          "contextWindow": 128000,
          "supportsImages": false,
          "supportsPromptCache": false,
          "inputPrice": 0,
          "outputPrice": 0
        },
        "id": "bm92f1yu3ik"
      }
    },
    "modeApiConfigs": {
      "code": "bm92f1yu3ik",
      "architect": "bm92f1yu3ik",
      "ask": "bm92f1yu3ik",
      "debug": "bm92f1yu3ik",
      "orchestrator": "bm92f1yu3ik"
    },
    "migrations": {
      "rateLimitSecondsMigrated": true,
      "diffSettingsMigrated": true
    }
  },
  "globalSettings": {
    "lastShownAnnouncementId": "apr-23-2025-3-14",
    "alwaysAllowReadOnly": false,
    "alwaysAllowReadOnlyOutsideWorkspace": false,
    "alwaysAllowWrite": false,
    "alwaysAllowWriteOutsideWorkspace": false,
    "writeDelayMs": 1000,
    "alwaysAllowBrowser": false,
    "alwaysApproveResubmit": false,
    "requestDelaySeconds": 10,
    "alwaysAllowMcp": false,
    "alwaysAllowModeSwitch": false,
    "alwaysAllowSubtasks": false,
    "alwaysAllowExecute": false,
    "browserToolEnabled": false,
    "browserViewportSize": "900x600",
    "screenshotQuality": 75,
    "remoteBrowserEnabled": false,
    "enableCheckpoints": true,
    "ttsEnabled": false,
    "ttsSpeed": 1,
    "soundEnabled": false,
    "soundVolume": 0.5,
    "maxOpenTabsContext": 20,
    "maxWorkspaceFiles": 200,
    "showRooIgnoredFiles": true,
    "maxReadFileLine": 500,
    "terminalOutputLineLimit": 500,
    "terminalShellIntegrationTimeout": 5000,
    "terminalCommandDelay": 0,
    "terminalPowershellCounter": false,
    "terminalZshClearEolMark": true,
    "terminalZshOhMy": false,
    "terminalZshP10k": false,
    "terminalZdotdir": false,
    "terminalCompressProgressBar": true,
    "experiments": {
      "powerSteering": false
    },
    "language": "zh-CN",
    "telemetrySetting": "disabled",
    "mcpEnabled": true
  }
}
`
