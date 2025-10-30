export const DEFAULT_PROVIDER_SETTINGS = `
{
  "providerProfiles": {
    "currentApiConfigName": "htf_default",
    "apiConfigs": {
      "htf_default": {
        "includeMaxTokens": false,
        "enableReasoningEffort": false,
        "apiProvider": "openai",
        "openAiBaseUrl": "http://llm.htffund.com/v1",
        "openAiApiKey": "sk-iLiWSbLYunZDVpHVyZrmuA",
        "openAiR1FormatEnabled": false,
        "openAiModelId": "DeepSeek-V3-671B",
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
      "htf_default_think": {
        "includeMaxTokens": false,
        "enableReasoningEffort": false,
        "apiProvider": "openai",
        "openAiBaseUrl": "http://llm.htffund.com/v1",
        "openAiApiKey": "sk-iLiWSbLYunZDVpHVyZrmuA",
        "openAiR1FormatEnabled": false,
        "openAiModelId": "deepseek-reasoner",
        "openAiCustomModelInfo": {
          "maxTokens": -1,
          "contextWindow": 128000,
          "supportsImages": false,
          "supportsPromptCache": false,
          "inputPrice": 0,
          "outputPrice": 0
        },
        "id": "bm92f1yu3il"
      },
	    "htf_default_image": {
        "includeMaxTokens": false,
        "enableReasoningEffort": false,
        "openAiBaseUrl": "http://llm.htffund.com/v1",
        "openAiApiKey": "sk-iLiWSbLYunZDVpHVyZrmuA",
        "openAiR1FormatEnabled": false,
        "openAiModelId": "Qwen2.5-VL-72B-Instruct-8k",
        "openAiCustomModelInfo": {
          "maxTokens": -1,
          "contextWindow": 32000,
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
      "orchestrator": "bm92f1yu3ik",
      "test":"bm92f1yu3ik",
      "design-engineer":"bm92f1yu3ik",
      "release-engineer":"bm92f1yu3ik",
      "translate":"bm92f1yu3ik"
    },
    "migrations": {
      "rateLimitSecondsMigrated": true,
      "diffSettingsMigrated": true,
      "openAiHeadersMigrated": true,
      "consecutiveMistakeLimitMigrated": true,
      "todoListEnabledMigrated": true
    }
  },
  "globalSettings": {
    "lastShownAnnouncementId": "oct-2025-v3.29.0-cloud-agents",
    "openRouterImageApiKey": "",
    "openRouterImageGenerationSelectedModel": "",
    "condensingApiConfigId": "bm92f1yu3ik",
    "customCondensingPrompt": "",
    "autoApprovalEnabled": true,
    "alwaysAllowReadOnly": true,
    "alwaysAllowReadOnlyOutsideWorkspace": false,
    "alwaysAllowWrite": false,
    "alwaysAllowWriteOutsideWorkspace": false,
    "alwaysAllowWriteProtected": false,
    "writeDelayMs": 1000,
    "alwaysAllowBrowser": false,
    "alwaysApproveResubmit": false,
    "requestDelaySeconds": 10,
    "alwaysAllowMcp": false,
    "alwaysAllowModeSwitch": false,
    "alwaysAllowSubtasks": false,
    "alwaysAllowExecute": false,
    "alwaysAllowFollowupQuestions": false,
    "followupAutoApproveTimeoutMs": 60000,
    "alwaysAllowUpdateTodoList": false,
    "allowedCommands": [
      "npm test",
      "npm install",
      "tsc",
      "git log",
      "git diff",
      "git show"
    ],
    "deniedCommands": [],
    "autoCondenseContext": true,
    "autoCondenseContextPercent": 100,
    "maxConcurrentFileReads": 15,
    "includeCurrentTime": true,
    "includeCurrentCost": false,
    "includeDiagnosticMessages": true,
    "maxDiagnosticMessages": 50,
    "browserToolEnabled": false,
    "browserViewportSize": "900x600",
    "screenshotQuality": 75,
    "remoteBrowserEnabled": false,
    "enableCheckpoints": true,
    "checkpointTimeout": 15,
    "ttsEnabled": false,
    "ttsSpeed": 1,
    "soundEnabled": false,
    "soundVolume": 0.5,
    "maxOpenTabsContext": 30,
    "maxWorkspaceFiles": 300,
    "showRooIgnoredFiles": true,
    "maxReadFileLine": -1,
    "maxImageFileSize": 10,
    "maxTotalImageSize": 50,
    "terminalOutputLineLimit": 1000,
    "terminalOutputCharacterLimit": 100000,
    "terminalShellIntegrationTimeout": 100000,
    "terminalShellIntegrationDisabled": false,
    "terminalCommandDelay": 0,
    "terminalPowershellCounter": false,
    "terminalZshClearEolMark": true,
    "terminalZshOhMy": false,
    "terminalZshP10k": false,
    "terminalZdotdir": false,
    "terminalCompressProgressBar": true,
    "experiments": {
      "powerSteering": true,
	    "multiFileApplyDiff": false,
      "preventFocusDisruption": false,
      "imageGeneration": false,
      "runSlashCommand": false
    },
    "codebaseIndexModels": {
      "openai": {
        "text-embedding-3-small": {
          "dimension": 1536
        },
        "text-embedding-3-large": {
          "dimension": 3072
        },
        "text-embedding-ada-002": {
          "dimension": 1536
        }
      },
      "ollama": {
        "nomic-embed-text": {
          "dimension": 768
        },
        "nomic-embed-code": {
          "dimension": 3584
        },
        "mxbai-embed-large": {
          "dimension": 1024
        },
        "all-minilm": {
          "dimension": 384
        }
      },
      "openai-compatible": {
        "text-embedding-3-small": {
          "dimension": 1536
        },
        "text-embedding-3-large": {
          "dimension": 3072
        },
        "text-embedding-ada-002": {
          "dimension": 1536
        },
        "nomic-embed-code": {
          "dimension": 3584
        }
      },
      "gemini": {
        "text-embedding-004": {
          "dimension": 768
        },
        "gemini-embedding-001": {
          "dimension": 3072
        }
      },
      "mistral": {
          "codestral-embed-2505": {
              "dimension": 1536
          }
      },
      "vercel-ai-gateway": {
          "openai/text-embedding-3-small": {
              "dimension": 1536
          },
          "openai/text-embedding-3-large": {
              "dimension": 3072
          },
          "openai/text-embedding-ada-002": {
              "dimension": 1536
          },
          "cohere/embed-v4.0": {
              "dimension": 1024
          },
          "google/gemini-embedding-001": {
              "dimension": 3072
          },
          "google/text-embedding-005": {
              "dimension": 768
          },
          "google/text-multilingual-embedding-002": {
              "dimension": 768
          },
          "amazon/titan-embed-text-v2": {
              "dimension": 1024
          },
          "mistral/codestral-embed": {
              "dimension": 1536
          },
          "mistral/mistral-embed": {
              "dimension": 1024
          }
      }      
    },
    "codebaseIndexConfig": {
      "codebaseIndexEnabled": false,
      "codebaseIndexQdrantUrl": "http://localhost:6333",
      "codebaseIndexEmbedderProvider": "openai-compatible",
      "codebaseIndexEmbedderBaseUrl": "",
      "codebaseIndexEmbedderModelId": "bce-base"
    },
    "language": "zh-CN",
    "telemetrySetting": "disabled",
    "mcpEnabled": true,
    "mode": "code",
    "customModes": [],
    "customSupportPrompts": {},
    "enhancementApiConfigId": "bm92f1yu3ik",
    "includeTaskHistoryInEnhance": true,
    "reasoningBlockCollapsed": true,
    "profileThresholds": {},
    "hasOpenedModeSelector": true
  }
}
`
