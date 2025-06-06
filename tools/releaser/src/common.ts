import {
  ChangelogConfig,
  generateMarkDown,
  getGitDiff,
  GitCommit,
  loadChangelogConfig,
  parseCommits,
  RawGitCommit,
  ResolvedChangelogConfig,
} from "changelogen";
import { execSync } from "child_process";

export async function getConfig(lastVersionTag: string) {
  return await loadChangelogConfig(process.cwd(), {
    from: lastVersionTag,
  });
}

export function getLastReleaseVersionTag(): string {
  const tag = execSync("git describe --tags --abbrev=0").toString().trim();
  return tag;
}

export async function getRawCommits(lastVersionTag: string) {
  return await getGitDiff(lastVersionTag);
}

export function filterConventionalCommits(
  rawCommits: RawGitCommit[],
  config: ChangelogConfig,
) {
  return parseCommits(rawCommits, config);
}

export async function getReleaseNotes(
  lastReleaseVersionTag: string,
  config: ResolvedChangelogConfig,
) {
  const conventionalCommits = filterConventionalCommits(
    await getRawCommits(lastReleaseVersionTag),
    config,
  );
  return await generateMarkDown(conventionalCommits, config);
}
