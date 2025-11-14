import { ToolProtocol, TOOL_PROTOCOL, isNativeProtocol } from "@roo-code/types"

export function getSharedToolUseSection(protocol: ToolProtocol = TOOL_PROTOCOL.XML): string {
	if (isNativeProtocol(protocol)) {
		return `====

TOOL USE

You have access to a set of tools that are executed upon the user's approval. Use the provider-native tool-calling mechanism. Do not include XML markup or examples.`
	}

	return `====

TOOL USE

You have access to a set of tools that are executed upon the user's approval. You must use exactly one tool per message, and every assistant message must include a tool call. You use tools step-by-step to accomplish a given task, with each tool use informed by the result of the previous tool use.

# Tool Use Formatting

Tool uses are formatted using XML-style tags. The tool name itself becomes the XML tag name. Each parameter is enclosed within its own set of tags. Here's the structure:

<actual_tool_name>
<parameter1_name>value1</parameter1_name>
<parameter2_name>value2</parameter2_name>
...
</actual_tool_name>

Always use the actual tool name as the XML tag name for proper parsing and execution.

**再次强调工具调用格式**
请严格按照 **Tool Use Formatting** 的要求，参考示例输出工具调用信息。它是ReAct模式，**不是openai tool_call** 格式。
think step by step, 检查输出工具的格式和内容。

**错误示例如下**:
<|tool_calls_section_begin|> <|tool_call_begin|> functions.read_file:0 <|tool_call_argument_begin|> {"args": {"file": {"path": "src/core/prompts/responses.ts"}}} <|tool_call_end|> <|tool_calls_section_end|>

**禁止使用**：
- <|tool_calls_section_begin|>
- <|tool_call_begin|>
- <|tool_call_argument_begin|>
- <|tool_call_argument_end|>
- <|tool_call_end|>
- <|tool_calls_section_end|>

# 禁止使用错误示例的格式，严格按照 **Tool Use Formatting** 的要求，使用XML-style tags。如果遇到失败的情况，请反复检查工具调用的格式是否正确。
`
}
