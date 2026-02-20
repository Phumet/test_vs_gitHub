#!/bin/bash

echo "🚀 GitHub Deployment Helper"
echo ""
echo "กรุณาใส่ GitHub username ของคุณ:"
read -p "Username: " username

if [ -z "$username" ]; then
  echo "❌ ต้องใส่ username!"
  exit 1
fi

echo ""
echo "📤 กำลัง push ไปที่ GitHub..."
echo ""

git remote add origin "https://github.com/$username/copilot-registration.git"
git branch -M main
git push -u origin main

echo ""
echo "✅ Push สำเร็จ!"
echo ""
echo "🌐 Repository URL: https://github.com/$username/copilot-registration"
echo ""
echo "📖 ขั้นตอนต่อไป: เปิดไฟล์ DEPLOYMENT.md"
