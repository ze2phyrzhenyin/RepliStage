#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo ""
echo "  RepliStage — 话剧排练工具"
echo ""

# 检查 node_modules
if [ ! -d "node_modules" ]; then
  echo "  正在安装依赖..."
  npm install --silent
fi

# 找一个可用端口，默认 3000
PORT=3000
while lsof -iTCP:$PORT -sTCP:LISTEN &>/dev/null; do
  PORT=$((PORT + 1))
done

echo "  启动开发服务器，端口 $PORT..."
echo "  地址：http://localhost:$PORT"
echo ""

# 启动并自动打开浏览器
open "http://localhost:$PORT" &
npm run dev -- --port $PORT
