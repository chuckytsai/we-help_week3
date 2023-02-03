# # ======抓取原始碼======
import json
import bs4
import os
import urllib.request as req
url = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions.json"
# 建立一個Request物件,附加Request headers的資訊
request = req.Request(url, headers={
    "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36"
})
with req.urlopen(request) as response:
    data = response.read().decode("utf-8")

# # ======解析原始碼,取得 景點名稱,經度,緯度,第一張圖檔網址======
root = bs4.BeautifulSoup(data, "html.parser")
wantdata = json.loads(str(root))

if os.path.isfile("data.txt"):
   os.remove("data.txt")
for wantIndex in range(len(wantdata["result"]["results"])):
    destination = wantdata["result"]["results"][wantIndex]["stitle"]  # 景點名稱
    longitudeX = wantdata["result"]["results"][wantIndex]["longitude"]  # 景點經度
    latitudeY = wantdata["result"]["results"][wantIndex]["latitude"]  # 景點緯度
    wantUrl = wantdata["result"]["results"][wantIndex]["file"]  # 撈到全部景點照片URL
    wantArray = wantUrl.split('http://')  # split 將https:// 作為分屍條件
    with open("data.txt", mode="a", encoding="utf-8") as file:
        file.write(destination + ','+longitudeX +
                   ','+latitudeY + ', https://' + wantArray[1] + ',\n')
