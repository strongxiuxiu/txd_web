"""
  auth : pxq
"""

import os
import uuid
import json
import datetime
import requests

from txdweb.web_conf import file_path, secret, appid
from productapp.models import FilePath
from django.db.models import Max

image_type = [
    'bmp',
    'jpg',
    'png',
    'tif',
    'gif',
    'pcx',
    'tga',
    'exif',
    'fpx',
    'svg',
    'psd',
    'cdr',
    'pcd',
    'dxf',
    'ufo',
    'eps',
    'ai',
    'raw',
    'WMF',
    'webp',
    'avif']

file_pdf = "pdf"

# 拼接的uuid后缀
_case_code = {
    'case': ('pa', 'oa'),  # pa: 案件委托书附件,oa: 案件其他附件
    "obj": ('as', 'op', 'oi', 'of', "cd", "iv"),  # as：评估摘要 ,op 标的物照片,oi 标的调查表,of 标的物其他附件,cd交割书
    "fb": ("fb", "iv"),  # fb 费用附件，iv 发票
    "obj_fb": ('as', 'op', 'oi', 'of', "cd", "iv"),
    "product": ('show', 'more', "pdf")
}
"ALL CASE OBJ FILE"
# query_type ={
#     "ALL":
# }


file_type = {
    "1001": '案件委托书',
    "1002": "案件其他附件",

    "1003": "标的物照片",
    "1004": "标的物调查表",
    "1005": "评估报告摘要",
    "1006": "标的物其他附件",

    "1007": "收费信息其他附件",
    "1008": "交割确认书",  # Confirmation of Delivery
    "1009": "发票",  # invoice
    "1010": "商品介绍",  # Confirmation of Delivery
    "1011": "商品详情",  # invoice
    "1012": "pdf说明书"
}

chinese_and_code = {
    ("pa", "案件委托书"),
    ("oa", "案件其他附件"),
    ("as", "评估摘要"),
    ("op", "标的物照片"),
    ("oi", "标的调查表"),
    ("of", "标的物附件"),
    ("fb", "费用附件"),
    ("cd", "交割确认书"),  # Confirmation of Delivery
    ("iv", "发票"),  # invoice
    ("show", "商品介绍"),  # Confirmation of Delivery
    ("more", "商品详情"),  # invoice
    ("pdf", "pdf说明书")  # invoice

}

download_path = "/home/panxiuqiang/txd_web/txdweb"

Subject_state = {
    1: "即将开始",
    2: "进行中",
    3: "已结束",
    4: "暂缓/中止"
}

operation_state = {
    1: "收藏",
    2: "浏览",
    3: "已结束"
}


img_split_str = "txdweb1"

class MyFile:
    def __init__(self, name):
        super(MyFile, self).__init__()
        self.filepath = file_path
        self.name = str(uuid.uuid1()) + '.' + name.split('.')[-1]
        self.old_name = name
        self.heard_uuid = "_uuid"
        time_ = datetime.date.today()
        path = self.filepath + str(time_)
        self.save_filepath = path + '/' + self.name
        if not os.path.exists(path):
            os.makedirs(path)

    def write(self, img):
        with open(self.save_filepath, 'wb') as fp:
            for info in img.chunks():
                fp.write(info)
        return True

    def print_save_filepath(self):
        return self.save_filepath


class FileOperation:
    error_list = []

    def __init__(self, file='', limit_max=10):
        if len(file) < limit_max:
            self.file = file
        else:
            self.file = []
        self.filepath_list = []
        self.filepath_dict = {}

    def file_update(self):
        if self.file:
            for binary_file in self.file:
                if not MyFile(str(binary_file)).write(binary_file):
                    self.error_list.append(str(binary_file))
            return self.error_list

        else:
            return False

    def head_a_update(self):
        if self.file:
            for binary_file in self.file:
                if not MyFile(str(binary_file)).write(binary_file):
                    return
            #         self.error_list.append(str(binary_file))
            # return self.error_list

        else:
            return False

    @staticmethod
    def file_update_function(
            file_object,
            filepath_uuid,
            ft_id,
            user_id,
            team=None,
            limit_max=99):
        # printfile_object, 44444444444444444)
        if file_object:
            if len(file_object) < limit_max:
                for img in file_object:
                    file_r = MyFile(str(img))
                    if file_r.write(img):

                        power_attorney_path = file_r.save_filepath
                        # printpower_attorney_path, 3333333)
                        if file_r.old_name.split('.')[-1] in image_type:  # 1 是图 2 是pdf 3 是其他附件
                            file_type_a = 1
                        elif file_r.old_name.split('.')[-1] in file_pdf:
                            file_type_a = 2
                        else:
                            file_type_a = 3
                        if team:
                            res = FilePath.objects.create(
                                filepath_uuid=filepath_uuid,
                                filepath=power_attorney_path,
                                user_id=user_id,
                                fileType_id=ft_id,
                                update_user=user_id,
                                old_filename=file_r.old_name,
                                file_type=file_type_a,
                                team_id=team
                            )
                            res.save()
                        else:
                            # print11111111111111, 22222)
                            res = FilePath.objects.create(
                                filepath_uuid=filepath_uuid,
                                filepath=power_attorney_path,
                                user_id=user_id,
                                fileType_id=ft_id,
                                update_user=user_id,
                                old_filename=file_r.old_name,
                                file_type=file_type_a,
                            )
                            res.save()
                            # print9999)
                return True
            return False
        return True

    @staticmethod
    def file_update_function_procedure(
            file_object,
            filepath_uuid,
            ft_id,
            user_id,
            object_id=None,
            team=None,
            file_id=None,
            last_updateTime=None, limit_max=9):
        # printobject_id, 555555555)
        # printfile_id, 4444444444444)
        if object_id:

            # # printfile_object, 44444444444444444)
            # # printfilepath_uuid, 77777777777777777777)
            # # printfile_object, 3334555555555555555555)
            # # printFilePath.objects.filter(filepath_uuid=filepath_uuid),9999)
            # res_f = FilePath.objects.filter(filepath_uuid=object_id).aggregate(Max('file_id'))
            # # printres_f, 666666666)
            # file_id = int(res_f["file_id__max"]) + int(file_id) +1

            if file_object:
                if isinstance(file_id, int):
                    file_id = int(file_id) + 1
                else:
                    try:
                        file_id = int(file_id) + 1
                    except:
                        file_id = 0
                # printfile_id, 444444444)
                # if len(file_object) < limit_max:
                #     for img in file_object:
                file_r = MyFile(str(file_object))
                if file_r.write(file_object):
                    power_attorney_path = file_r.save_filepath
                    # printfile_r, 4444)
                    if file_r.old_name.split('.')[-1] in image_type:  # 1 是图 2 是pdf 3 是其他附件
                        file_type_a = 1
                    elif file_r.old_name.split('.')[-1] in file_pdf:
                        file_type_a = 2
                    else:
                        file_type_a = 3
                    if last_updateTime:
                        if team:

                            # print123123123123123123)
                            r = FilePath.objects.create(
                                filepath_uuid=filepath_uuid,
                                filepath=power_attorney_path,
                                user_id=user_id,
                                fileType_id=ft_id,
                                update_user=user_id,
                                old_filename=file_r.old_name,
                                file_type=file_type_a,
                                team_id=team,
                                file_id=file_id,
                                update_time=last_updateTime
                            )
                            # # printr.filepath_id,3444444)


                        else:
                            # print"保存了图片")
                            r = FilePath.objects.create(
                                filepath_uuid=filepath_uuid,
                                filepath=power_attorney_path,
                                user_id=user_id,
                                fileType_id=ft_id,
                                update_user=user_id,
                                old_filename=file_r.old_name,
                                file_type=file_type_a,
                                update_time=last_updateTime
                            )
                            # # printr.filepath_id,8888)
                        return r.filepath_id
                    if team:

                        # print123123123123123123)
                        r = FilePath.objects.create(
                            filepath_uuid=filepath_uuid,
                            filepath=power_attorney_path,
                            user_id=user_id,
                            fileType_id=ft_id,
                            update_user=user_id,
                            old_filename=file_r.old_name,
                            file_type=file_type_a,
                            team_id=team,
                            file_id=file_id,
                        )
                        # # printr.filepath_id,3444444)


                    else:
                        # print"保存了图片")
                        r = FilePath.objects.create(
                            filepath_uuid=filepath_uuid,
                            filepath=power_attorney_path,
                            user_id=user_id,
                            fileType_id=ft_id,
                            update_user=user_id,
                            old_filename=file_r.old_name,
                            file_type=file_type_a,
                        )
                        # # printr.filepath_id,8888)
                    return r.filepath_id
                # print2123, 333333)
                return False
            return True
        else:
            if file_object:
                file_r = MyFile(str(file_object))
                if file_r.write(file_object):
                    power_attorney_path = file_r.save_filepath
                    # printfile_r, 4444)
                    if file_r.old_name.split('.')[-1] in image_type:  # 1 是图 2 是pdf 3 是其他附件
                        file_type_a = 1
                    elif file_r.old_name.split('.')[-1] in file_pdf:
                        file_type_a = 2
                    else:
                        file_type_a = 3
                    if last_updateTime:
                        if team:

                            # print123123123123123123)
                            r = FilePath.objects.create(
                                filepath_uuid=filepath_uuid,
                                filepath=power_attorney_path,
                                user_id=user_id,
                                fileType_id=ft_id,
                                update_user=user_id,
                                old_filename=file_r.old_name,
                                file_type=file_type_a,
                                team_id=team,
                                file_id=file_id,
                                update_time=last_updateTime
                            )
                            # # printr.filepath_id,3444444)


                        else:
                            # print"保存了图片")
                            r = FilePath.objects.create(
                                filepath_uuid=filepath_uuid,
                                filepath=power_attorney_path,
                                user_id=user_id,
                                fileType_id=ft_id,
                                update_user=user_id,
                                old_filename=file_r.old_name,
                                file_type=file_type_a,
                                update_time=last_updateTime
                            )
                            # # printr.filepath_id,8888)
                        return r.filepath_id
                    if team:

                        # print123123123123123123)
                        r = FilePath.objects.create(
                            filepath_uuid=filepath_uuid,
                            filepath=power_attorney_path,
                            user_id=user_id,
                            fileType_id=ft_id,
                            update_user=user_id,
                            old_filename=file_r.old_name,
                            file_type=file_type_a,
                            team_id=team,
                            file_id=file_id,
                        )
                        # # printr.filepath_id,3444444)


                    else:
                        # print"保存了图片")
                        r = FilePath.objects.create(
                            filepath_uuid=filepath_uuid,
                            filepath=power_attorney_path,
                            user_id=user_id,
                            fileType_id=ft_id,
                            update_user=user_id,
                            old_filename=file_r.old_name,
                            file_type=file_type_a,
                        )
                        # # printr.filepath_id,8888)
                    return r.filepath_id
                # print2123, 333333)
                return False
            return True

    @staticmethod
    def file_remove_function(file_list):
        if isinstance(file_list, dict):
            for filepath_uuid in file_list.values():
                filepath = FilePath.objects.filter(
                    filepath_uuid=filepath_uuid).values(
                    "filepath_id", 'filepath')
                if filepath:
                    for i in filepath:
                        os.remove(i["filepath"])
                        file = FilePath.objects.get(
                            filepath_id=i["filepath_id"])
                        file.delete()
            return True
        if isinstance(file_list, list):
            for filepath_uuid in file_list:
                filepath = FilePath.objects.filter(
                    filepath_uuid=filepath_uuid).values(
                    "filepath_id", 'filepath')
                os.remove(filepath["filepath"])
                file = FilePath.objects.get(
                    filepath_id=filepath["filepath_id"])
                file.delete()
            return True
        return False

    @staticmethod
    def send_filepath_remove_file(filepath_list):
        for filepath in filepath_list:
            if filepath:
                try:
                    os.remove(filepath)
                except FileNotFoundError:
                    pass
                file = FilePath.objects.get(
                    filepath=filepath)
                file.delete()
        return True

    @staticmethod
    def send_filepath_id_file_remove(fileid):
        file = FilePath.objects.filter(
            filepath_id=fileid).values()
        for i in file:
            try:
                os.remove(i['filepath'])
            except FileNotFoundError:
                pass
        file = FilePath.objects.get(
            filepath_id=fileid)
        file.delete()
        return True

    @staticmethod
    def send_filepath_id_file_remove_procedure(fileid=None, file_id=None):
        if fileid:
            file = FilePath.objects.filter(
                filepath_id=fileid).values()
            for i in file:
                try:
                    os.remove(i['filepath'])
                except FileNotFoundError:
                    pass
            file = FilePath.objects.get(
                filepath_id=fileid)
            file.delete()
            return True
        else:
            # try:
            file = FilePath.objects.filter(
                file_id=file_id).values()
            if file:
                for i in file:
                    # try:
                    if os.path.exists(i['filepath']):
                        os.remove(i['filepath'])
                    file_obj = FilePath.objects.get(file_id=i["filepath_id"])
                    file_obj.delete()
                    # except FileNotFoundError:
                    #     pass
            # # print1111111111111111111)
            # file = FilePath.objects.get(
            #     filepath_uuid=file_id)
            # # printfile)
            # file.delete()
            # return True
            # except:
            #
            #     return True

    @staticmethod
    def produce_file_uuid(file_uuid, obj_type):
        uuid_dict = {}
        for k, v in _case_code.items():
            if k == obj_type:
                for uid in v:
                    uuid_dict[str(uid) + "_uuid"] = str(file_uuid) + str(uid)
        return uuid_dict

    @staticmethod
    def send_uuid_back_path(_uuid):
        if isinstance(_uuid, dict):
            filepath_dict = {}
            for id_key, id_value in _uuid.items():
                filepath_list = []
                for file_path in FilePath.objects.filter(
                        filepath_uuid=_uuid[id_key]).values("filepath", 'old_filename', 'filepath_id', "file_id"):
                    fileinfo = {}
                    filepath = file_path['filepath']
                    fileinfo['filepath'] = filepath.split(img_split_str)[-1]
                    fileinfo['filename'] = file_path['old_filename']
                    fileinfo['filepath_id'] = file_path['filepath_id']
                    if file_path['file_id']:
                        fileinfo['file_id'] = int(file_path['file_id'])
                    else:
                        fileinfo['file_id'] = file_path['file_id']
                    filepath_list.append(fileinfo)
                # # printfilepath_list, 44455)
                filepath_list.sort(key=lambda stu: stu["file_id"])
                my_key = str(id_key.split('_')[0]) + '_filepath'
                filepath_dict[my_key] = filepath_list
            return filepath_dict

    @staticmethod
    def send_uuid_back_path_nofile(_uuid):
        if isinstance(_uuid, dict):
            filepath_dict = {}
            for id_key, id_value in _uuid.items():
                filepath_list = []
                for file_path in FilePath.objects.filter(
                        filepath_uuid=_uuid[id_key]).values("filepath", 'old_filename', 'filepath_id'):
                    fileinfo = {}
                    filepath = file_path['filepath']
                    fileinfo['filepath'] = filepath.split(img_split_str)[-1]
                    fileinfo['filename'] = file_path['old_filename']
                    fileinfo['filepath_id'] = file_path['filepath_id']
                    # if file_path['file_id']:
                    #     fileinfo['file_id'] = int(file_path['file_id'])
                    # else:
                    #     fileinfo['file_id'] = file_path['file_id']
                    filepath_list.append(fileinfo)
                # # printfilepath_list, 44455)
                # filepath_list.sort(key=lambda stu: stu["file_id"])
                my_key = str(id_key.split('_')[0]) + '_filepath'
                filepath_dict[my_key] = filepath_list
            return filepath_dict


    @staticmethod
    def send_uuid_back_path_procedure(_uuid):
        if isinstance(_uuid, dict):
            filepath_dict = {}
            for id_key, id_value in _uuid.items():
                filepath_list = []
                for file_path in FilePath.objects.filter(
                        filepath_uuid=_uuid[id_key]).values("filepath", 'old_filename', 'filepath_id', "file_id"):
                    fileinfo = {}
                    filepath = file_path['filepath']
                    fileinfo['filepath'] = filepath.split("WebGUI")[-1]
                    fileinfo['filename'] = file_path['old_filename']
                    fileinfo['filepath_id'] = file_path['filepath_id']
                    if file_path['file_id']:
                        fileinfo['file_id'] = int(file_path['file_id'])
                    else:
                        fileinfo['file_id'] = file_path['file_id']
                    filepath_list.append(fileinfo)
                # filepath_list.reverse()
                filepath_list.sort(key=lambda stu: stu["file_id"])
                my_key = str(id_key.split('_')[0]) + '_filepath'
                filepath_dict[my_key] = filepath_list
            return filepath_dict

    @staticmethod
    def send_uuid_back_info(_uuid):
        if isinstance(_uuid, dict):
            filepath_dict = {}
            for id_key, id_value in _uuid.items():
                filepath_list = []
                for file_path in FilePath.objects.filter(
                        filepath_uuid=_uuid[id_key]).values():
                    if (file_path["filepath"]).split(".")[-1] in image_type:
                        file_path['file_type'] = 'img'
                    else:
                        file_path['file_type'] = 'file'
                    file_path['update_time'] = datetime.datetime.date(
                        file_path['update_time'])
                    filepath_list.append(file_path)
                my_key = str(id_key.split('_')[0]) + '_filepath'
                filepath_dict[my_key] = filepath_list
            return filepath_dict

    @staticmethod
    def one_file_update(file_uuid, obj_type):
        uuid_dict = {}
        for k, v in _case_code.items():
            if k == obj_type:
                for uid in v:
                    uuid_dict[str(uid) + "_uuid"] = str(file_uuid) + str(uid)
        return uuid_dict


def send_file_back_uuid(item, obj, uid, code, user_id):
    if item:
        if not FileOperation.file_update_function(
                file_object=item,
                filepath_uuid=obj[uid],
                ft_id=file_type[str(code)],
                user_id=user_id):
            return False
    return True


def serialize(res):
    ser_res = []
    for i in res:
        ser_res.append(i)
    return ser_res


def get_weixin(js_code):
    url = "https://api.weixin.qq.com/sns/jscode2session?" + "appid={}&secret={}&js_code={}&grant_type=authorization_code".format(
        appid, secret, js_code)
    c_info_all = requests.get(url)
    res = json.loads(c_info_all.text)
    return res
