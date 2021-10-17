import { NotionText } from "../interfaces";
import { hashCode } from "../utils";

export const Text = ({ text, prefix }: { text: any, prefix?: string }) => {
    if (!text) {
        return null;
    }

    return text.map((value: NotionText) => {
        const { annotations, text } = value;
        const { bold, code, color, italic, strikethrough, underline } = annotations
        const className = [
            bold ? "font-bold" : "",
            code ? "font-mono" : "",
            italic ? "italic" : "",
            strikethrough ? "line-through" : "",
            underline ? "underline" : "",
        ].join(" ").replace(/\s+/g, ' ').trim()
        return (
            <span
                key={hashCode(`${prefix || ''}${text.content}`)}
                className={className || null}
                style={color !== "default" ? { color } : {}}
            >
                {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
            </span>
        );
    });
};
