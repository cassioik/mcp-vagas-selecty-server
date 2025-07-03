import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from "zod";

const server = new McpServer({
  name: "Selecty Vagas Server",
  version: "1.0.0"
});

server.tool(
  'get-vagas',
  'Tool to get job listings from Selecty',
  {
    portal: z.string().optional().describe("The portal to filter jobs (optional)"),
    page: z.number().optional().describe("Page number (default: 1)"),
    per_page: z.number().optional().describe("Number of jobs per page (default: 10)")
  },
  async({ portal, page = 1, per_page = 10 }) => {
    try {
      // Check for API key
      const apiKey = process.env.SELECTY_API_KEY;
      if (!apiKey) {
        return {
          content: [
            {
              type: "text",
              text: "Error: SELECTY_API_KEY environment variable is not set. Please configure your API key."
            }
          ]
        };
      }

      // Step 1: Build API URL
      let apiUrl = `https://api.selecty.app/v2/jobfeed/index?page=${page}&per_page=${per_page}`;

      if (portal) {
        apiUrl += `&portal=${encodeURIComponent(portal)}`;
      }

      // Step 2: Fetch job data from Selecty API
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Api-Key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jobData = await response.json();

      // Handle no jobs found - the API returns an object with 'data' array
      if (!jobData || !jobData.data || !Array.isArray(jobData.data) || jobData.data.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No jobs found${portal ? ` for portal "${portal}"` : ''}.`
            }
          ]
        };
      }

      // Return the complete job data as JSON
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(jobData, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching job data: ${error.message}`
          }
        ]
      };
    }
  }
);

const transport = new StdioServerTransport();
server.connect(transport);
