export const DEFAULT_PROVIDER_SETTINGS = `
{
  "providerProfiles": {
    "currentApiConfigName": "htf_default",
    "apiConfigs": {
      "htf_default": {
        "apiProvider": "openai",
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
      },
	  "htf_default_image": {
        "openAiBaseUrl": "http://llm.htffund.com/v1",
        "openAiApiKey": "sk-iLiWSbLYunZDVpHVyZrmuA",
        "openAiR1FormatEnabled": false,
        "openAiModelId": "Qwen2.5-VL-72B-Instruct-8k",
        "openAiCustomModelInfo": {
          "maxTokens": -1,
          "contextWindow": 128000,
          "supportsImages": true,
          "supportsPromptCache": false,
          "inputPrice": 0,
          "outputPrice": 0
        },
        "apiProvider": "openai",
        "id": "2tp0dy5v504"
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
      "diffSettingsMigrated": true,
      "openAiHeadersMigrated": true
    }
  },
  "globalSettings": {
    "lastShownAnnouncementId": "apr-23-2025-3-14",
    "alwaysAllowReadOnly": true,
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
    "maxOpenTabsContext": 30,
    "maxWorkspaceFiles": 300,
    "showRooIgnoredFiles": true,
    "maxReadFileLine": -1,
    "terminalOutputLineLimit": 1000,
    "terminalShellIntegrationTimeout": 5000,
    "terminalCommandDelay": 0,
    "terminalPowershellCounter": false,
    "terminalZshClearEolMark": true,
    "terminalZshOhMy": false,
    "terminalZshP10k": false,
    "terminalZdotdir": false,
    "terminalCompressProgressBar": true,
    "experiments": {
      "powerSteering": false,
	    "autoCondenseContext": false
    },
    "language": "zh-CN",
    "telemetrySetting": "disabled",
    "mcpEnabled": false
  }
}
`
