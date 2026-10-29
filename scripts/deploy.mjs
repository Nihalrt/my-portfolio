import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Publish a normal commit to the existing Pages branch, preserving its history.
const root = fileURLToPath(new URL("../", import.meta.url));
const git = (args, cwd = root) =>
  execFileSync("git", args, { cwd, stdio: "inherit" });
execFileSync(
  process.platform === "win32" ? "npm.cmd" : "npm",
  ["run", "build"],
  { cwd: root, stdio: "inherit" },
);
git(["fetch", "origin", "gh-pages"]);
const temporary = mkdtempSync(join(tmpdir(), "nihal-portfolio-"));
const checkout = join(temporary, "pages");
let attached = false;
try {
  git(["worktree", "add", "--detach", checkout, "FETCH_HEAD"]);
  attached = true;
  for (const entry of readdirSync(checkout)) {
    if (entry !== ".git")
      rmSync(join(checkout, entry), { recursive: true, force: true });
  }
  cpSync(join(root, "dist"), checkout, { recursive: true });
  git(["add", "--all"], checkout);
  try {
    execFileSync("git", ["diff", "--cached", "--quiet"], { cwd: checkout });
    console.log("The published files are already up to date.");
  } catch {
    git(["commit", "-m", "Publish updated portfolio"], checkout);
    git(["push", "origin", "HEAD:refs/heads/gh-pages"], checkout);
    console.log(
      "Published assets pushed. GitHub Pages will finish the deployment.",
    );
  }
} finally {
  if (attached) git(["worktree", "remove", "--force", checkout]);
  if (existsSync(temporary))
    rmSync(temporary, { recursive: true, force: true });
}
