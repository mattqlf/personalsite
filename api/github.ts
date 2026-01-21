const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

const jsonResponse = (res: any, data: unknown, status = 200) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.end(JSON.stringify(data));
};

const CONTRIBUTION_QUERY = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            color
          }
        }
      }
    }
  }
}
`;

export default async function handler(req: any, res: any) {
  if (req.method && req.method !== "GET") {
    return jsonResponse(res, { error: "Method not allowed." }, 405);
  }

  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "mattqlf";

  if (!token) {
    return jsonResponse(
      res,
      { error: "Missing GitHub token." },
      500
    );
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CONTRIBUTION_QUERY,
        variables: { username },
      }),
    });

    if (!response.ok) {
      return jsonResponse(
        res,
        { error: "Failed to fetch GitHub data." },
        500
      );
    }

    const data = await response.json();

    if (data.errors) {
      return jsonResponse(
        res,
        { error: data.errors[0]?.message || "GraphQL error" },
        500
      );
    }

    const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return jsonResponse(
        res,
        { error: "No contribution data found." },
        404
      );
    }

    return jsonResponse(res, {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    });
  } catch (error) {
    return jsonResponse(
      res,
      { error: "Failed to fetch contribution data." },
      500
    );
  }
}
