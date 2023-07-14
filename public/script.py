import requests
import shutil
import pprint
from datetime import datetime, timedelta

# Import tower names from file
with open("towers-cycle.txt") as f:
    towers_cycle = f.read().splitlines()


def download_tower_images():
    # Download images
    for tower in towers_cycle:
        url = f"https://statsnite.com/images/btd/towers/{tower}/tower.png"

        response = requests.get(url, stream=True)

        if response.status_code == 200:
            outPath = f"images/{tower}.png"
            with open(outPath, "wb") as out_file:
                shutil.copyfileobj(response.raw, out_file)
            del response
            print(f"✔️ Successfully downloaded {tower}.png")
        else:
            print(f"⚠️ Error downloading {tower}.png")


towers_english = [tower.replace("-", " ").title() for tower in towers_cycle]

current_date = datetime(year=2023, month=7, day=10, hour=12)
offset = 7

print(current_date.strftime("%B %d, %Y, %H:%M"))
print(towers_cycle[(offset + 0) % len(towers_cycle)])
print(towers_cycle[(offset + 1) % len(towers_cycle)])
print(towers_cycle[(offset + 2) % len(towers_cycle)])
print(towers_cycle[(offset + 3) % len(towers_cycle)])


current_date += timedelta(hours=8)
offset += 4

print()
print(current_date.strftime("%B %d, %Y, %H:%M"))
print(towers_cycle[(offset + 0) % len(towers_cycle)])
print(towers_cycle[(offset + 1) % len(towers_cycle)])
print(towers_cycle[(offset + 2) % len(towers_cycle)])
print(towers_cycle[(offset + 3) % len(towers_cycle)])

current_date += timedelta(hours=8)
offset += 4

print()
print(current_date.strftime("%B %d, %Y, %H:%M"))
print(towers_cycle[(offset + 0) % len(towers_cycle)])
print(towers_cycle[(offset + 1) % len(towers_cycle)])
print(towers_cycle[(offset + 2) % len(towers_cycle)])
print(towers_cycle[(offset + 3) % len(towers_cycle)])
