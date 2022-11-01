import path from "path";
import fs from "fs";
import matter from "gray-matter";

import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

//一覧取得（mdファイルのデータを日付順にソート）
export function getSortedPostsData() {
  // /posts配下のファイル名を取得
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // idを取得するためにファイル名の拡張子を除外
    const id = fileName.replace(/\.md$/, "");

    //mdファイルを文字列として取得
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    //投稿のメタデータ部分を解析
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });
  //投稿を日付でソートする
  return allPostsData.sort((a, b) => {
    if (a.data < b.data) {
      return 1;
    } else {
      return -1;
    }
  });
}

//動的ルーティング時に設定（ファイル名をルーティングに使用）
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// 詳細取得
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // 投稿のメタデータ部分を解析
  const matterResult = matter(fileContents);

  // マークダウンをHTML文字列に変換
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHTML = processedContent.toString();

  //　データをidと組み合わせる。
  return {
    id,
    contentHTML,
    ...matterResult.data,
  };
}