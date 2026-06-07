# Edit from file, not from memory

Before composing the `old_string` for any Edit call on a file you have not read in the **current tool call sequence**, re-read the specific section you intend to change.

Do not reconstruct `old_string` from context window memory — file content as you recall it and file content as it actually is diverge after edits, summaries, or context compression. Synthesis files and topic indexes are edited frequently and are especially prone to this.

**Rule**: if the last Read of the target file was more than a few tool calls ago, read the relevant lines again before editing. One extra Read costs less than a failed Edit plus a retry Read plus a second Edit.
