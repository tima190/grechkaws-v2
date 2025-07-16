// scripts/generate-version.js
import { simpleGit } from 'simple-git'
import fs from 'fs'

const git = simpleGit()

async function generateVersion() {
  const branch = await git.revparse(['--abbrev-ref', 'HEAD'])
  const commitHash = await git.revparse(['--short', 'HEAD'])
  const log = await git.log({ maxCount: 1 })
  const tagList = await git.tags()
  const tag = tagList.latest || null

  const versionInfo = {
    tag,                            // Например: '0.1.1'
    branch,                         // Например: 'main'
    commit: commitHash,             // Например: 'a1b2c3d'
    message: log.latest?.message || 'нет сообщения',
    full: tag
      ? `${tag} (${branch}) — ${log.latest?.message || 'нет сообщения'}`
      : `${branch} (${commitHash}) — ${log.latest?.message || 'нет сообщения'}`
  }

  fs.writeFileSync('./version.json', JSON.stringify(versionInfo, null, 2))
  console.log('✔ Сгенерирован файл version.json:')
  console.log(versionInfo)
}

generateVersion()
