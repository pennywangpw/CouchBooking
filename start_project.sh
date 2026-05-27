#!/bin/bash

# 獲取腳本所在的目錄，確保路徑正確
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_ROOT="$SCRIPT_DIR"

# 定義一個變數來記錄後端的進程 ID，方便後面一起關閉
BACKEND_PID=""

# 當按下 Ctrl+C 結束腳本時，自動把後端也一起殺掉，避免佔用連接埠
cleanup() {
    if [ -not -z "$BACKEND_PID" ]; then
        echo -e "\n正在停止後端服務 (PID: $BACKEND_PID)..."
        kill $BACKEND_PID 2>/dev/null
    fi
    echo "前後端服務已全部停止。"
    exit 0
}
trap cleanup SIGINT

# --- 後端設定 ---
echo "正在啟動後端..."
cd "$PROJECT_ROOT/backend" || { echo "無法切換到後端目錄"; exit 1; }

# 【重點】在背景啟動後端（尾字加上 &），並記錄它的 PID
npm start &
BACKEND_PID=$!
echo "後端已在背景啟動 (PID: $BACKEND_PID)"

echo "等待後端初始化 (預留 3 秒)..."
sleep 3

# --- 前端設定 ---
echo "正在準備前端..."
cd "$PROJECT_ROOT/frontend" || { echo "無法切換到前端目錄"; exit 1; }

# 1. 載入 NVM 環境
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    source "$NVM_DIR/nvm.sh"
else
    echo "❌ 錯誤：找不到 NVM。請確保你的電腦有安裝 NVM。"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# 2. 強制切換到 Node 16
echo "正在切換前端 Node.js 版本到 16..."
nvm use 16

# 3. 檢查當前 Node 版本是否真的為 16
CURRENT_NODE_VERSION=$(node -v)
if [[ $CURRENT_NODE_VERSION == v16.* ]]; then
    echo "✅ 成功確認：前端 Node.js 版本為 $CURRENT_NODE_VERSION"
else
    echo "❌ 錯誤：無法切換到 Node 16，目前版本為 $CURRENT_NODE_VERSION"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# 4. 啟動前端開發伺服器（這會佔用當前終端機視窗）
echo "正在啟動前端..."
npm start