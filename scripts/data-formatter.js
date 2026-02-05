/**
 * ScrapeLogic Data Formatter
 * Pre-processes raw HTML into clean, semantic text for LLM ingestion.
 */

const formatScrapedData = (htmlInput) => {
    if (!htmlInput) return "";

    // 1. Initialize a virtual parser if in a browser environment
    // Or use regex if running in a node-based n8n function
    let cleanText = htmlInput;

    // 2. Remove non-content elements
    const noisePatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // Scripts
        /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,   // Styles
        /<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, // Common Nav
        /<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, // Footers
        /<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi,         // Nav Bars
        //g                                    // Comments
    ];

    noisePatterns.forEach(pattern => {
        cleanText = cleanText.replace(pattern, "");
    });

    // 3. Convert essential structural tags to simple identifiers for Claude
    cleanText = cleanText
        .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n[TITLE]: $1\n")
        .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n[SUBTITLE]: $1\n")
        .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "\n* $1")
        .replace(/<button[^>]*>([\s\S]*?)<\/button>/gi, " [CTA: $1] ");

    // 4. Strip remaining HTML tags
    cleanText = cleanText.replace(/<[^>]+>/g, " ");

    // 5. Clean up whitespace and line breaks
    cleanText = cleanText
        .replace(/\s+/g, " ")       // Collapse multiple spaces
        .replace(/\n\s*\n/g, "\n")  // Collapse multiple newlines
        .trim();

    // 6. Token capping (Safety measure for Claude 3.5 window)
    const MAX_CHARS = 12000; 
    if (cleanText.length > MAX_CHARS) {
        cleanText = cleanText.substring(0, MAX_CHARS) + "... [Data Truncated]";
    }

    return cleanText;
};

// Export for use in n8n Code Nodes or Frontend
if (typeof module !== 'undefined') {
    module.exports = { formatScrapedData };
}
