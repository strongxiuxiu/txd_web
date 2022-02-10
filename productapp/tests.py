from django.test import TestCase

# Create your tests here.
print(1)

# a = [{'filepath': '/static/media/2021-09-24/d6007928-1cff-11ec-8b4b-00163e2455fb.jpg', 'filename': 'tmp_9940240e61aefff6db010d8c045d2a62215a19293a7f8f', 'filepath_id': 3972, 'file_id': '1'}, {'filepath': '/static/media/2021-09-24/d60164c8-1cff-11ec-ac0c-00163e2455fb.jpg', 'filename': 'tmp_5846d65b4e071ded096ede685ced5f285e55ca408e5e1a', 'filepath_id': 3973, 'file_id': '0'}, {'filepath': '/static/media/2021-09-24/d60958f4-1cff-11ec-b69a-00163e2455fb.jpg', 'filename': 'tmp_4543b632c9e357f02b933c902c6725c5e22d10e6f2b7c7', 'filepath_id': 3977, 'file_id': '2'}]
a = [{'filepath': '/static/media/2021-09-26/6333a86c-1ea7-11ec-9ee7-00163e2455fb.png',
      'filename': 'Qf7HOA233oCJ75db13cc05c112dce6046cbe38f9fb37.png', 'filepath_id': 4483, 'file_id': '10'},
     {'filepath': '/static/media/2021-09-26/74c0e036-1ea7-11ec-88b4-00163e2455fb.png',
      'filename': 'ZzvBiGzMvgFP0518df92667a2f22f5897683f953ee83.png', 'filepath_id': 4484, 'file_id': '11'},
     {'filepath': '/static/media/2021-09-26/758eb5d8-1ea7-11ec-85d3-00163e2455fb.png',
      'filename': 'k6VqFamBVx7O75db13cc05c112dce6046cbe38f9fb37.png', 'filepath_id': 4485, 'file_id': '12'},
     {'filepath': '/static/media/2021-09-26/41b744d2-1ea7-11ec-8e8a-00163e2455fb.jpg',
      'filename': 'A0CZByYpscQO59b9a6e3f986d8207428693a4c4d2e4f.jpg', 'filepath_id': 4479, 'file_id': '6'},
     {'filepath': '/static/media/2021-09-26/41b93760-1ea7-11ec-9f05-00163e2455fb.jpg',
      'filename': 'YuRDKxfOERt88d1521b520c2bdd6f6dba1e7e560e9a0.jpg', 'filepath_id': 4480, 'file_id': '7'},
     {'filepath': '/static/media/2021-09-26/426dc522-1ea7-11ec-b602-00163e2455fb.png',
      'filename': 'zWUSSACDb0xS0518df92667a2f22f5897683f953ee83.png', 'filepath_id': 4482, 'file_id': '9'}]
for i in a:
    print(i)
a.sort(key=lambda a: a["file_id"])
print(a)


stuDictList = [
    {"name": "张飞", "power": 96, "tellegent": 30},
    {"name": "诸葛亮", "power": 40, "tellegent": 99},
    {"name": "周瑜", "power": 79, "tellegent": 93},
    {"name": "赵云", "power": 97, "tellegent": 86},
]

print("原始的数据\n{}".format(stuDictList))

print("开始按照武力排序,由小到大")
stuDictList.sort(key=lambda stu: stu["power"])

