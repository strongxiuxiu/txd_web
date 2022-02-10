"""
This is the configuration file for the entire system

You can find all the configuration file information here

If you need to add or modify the configuration

Using this file is a good choice

author ： PanXiuQiang
TIME: 2021.7.20 10:57

"""
# 这个是图片类型的合集
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

# 拼接的uuid后缀，每一个图片都有自己的uuid为了方便查询该图片属于哪个案件或者标的
# 我将用生成的案件或者标的的UUID进行后缀拼接,得到文件的唯一标识符，
# 该方法还有改进之处,由于时间原因,暂时如此。

_case_code = {
    'case': ('pa', 'oa'),  # pa: 案件委托书附件,oa: 案件其他附件
    # as：评估摘要 ,op 标的物照片,oi 标的调查表,of 标的物其他附件,cd交割书
    "obj": ('as', 'op', 'oi', 'of', "cd", "iv"),
    "fb": ("fb", "iv"),  # fb 费用附件，iv 发票
    "obj_fb": ('as', 'op', 'oi', 'of', "cd", "iv")

}
"ALL CASE OBJ FILE"
# query_type ={
#     "ALL":
# }

# 这是该系统的可能存在的文件类型的总和，根据不同的类型，会有不同的文件种类信息
file_type = {
    "1001": '案件委托书',
    "1002": "案件其他附件",

    "1003": "标的物照片",
    "1004": "标的物调查表",
    "1005": "评估报告摘要",
    "1006": "标的物其他附件",

    "1007": "收费信息其他附件",
    "1008": "交割确认书",  # Confirmation of Delivery
    "1009": "发票"  # invoice

}

# 这是代码后缀的文件中午类型的集合查询code
chinese_and_code = {
    ("pa", "案件委托书"),
    ("oa", "案件其他附件"),
    ("as", "评估摘要"),
    ("op", "标的物照片"),
    ("oi", "标的调查表"),
    ("of", "标的物附件"),
    ("fb", "费用附件"),
    ("cd", "交割确认书"),  # Confirmation of Delivery
    ("iv", "发票")  # invoice
}
# 下载文件路径,也是web存放路径
download_path = "/home/panxiuqiang/WebGUI1.1/WebGUI"

# 拼接file的存储id的后缀
merge_uuid = "_uuid"

# 默认头像的存储地址
head_portrait_path = "/static/img/touxaingdefalut.jpg"
# 默认小程序头像地址
wx_portrait_path = "/static/img/wx.jpg"

# 用户账号的等级和类型
user_account_type = {0: "企业管理员", 1: "团队管理员", 2: "员工"}

# 返回数据的body值
sys_code = {
    # success
    "210011": "数据添加成功",
    "210012": "数据删除成功",
    "210013": "数据修改成功",
    "210014": "获取数据成功",
    "210015": "数据保存成功",
    "210016": "数据查询成功",
    "210017": "文件上传成功",
    "210018": "用户激活成功",
    # error
    "110011": "数据重复添加",
    "110012": "数据添加失败",
    "110013": "数据删除失败",
    "110014": "数据修改失败",
    "110015": "数据查询失败",

    "410011": "请求方式错误",
    "410012": "文件上传数量大于9个",
    "410013": "删除文件错误",
    "410014": "删除失败，请先删除标的物对应的费用信息",
    "410016": "删除失败，请先删除费用对应的标的物信息",

    "410017": "原始密码错误，无法修改",
    "410018": "该用户未分配团队",

    "510011": "服务内部错误",
    "510012": "参数不完整",

    "610011": "数据完整性错误",

    "710011": "查询关系不存在",
    "710012": "执行出错",

    "800000": "登录成功",
    "800001": "用户名密码错误或者用户不存在",
    "800002": "用户名密码格式输入错误",
    "800003": "用户名密码错误",
    "800004": "用户名已存在",
    "800005": "团队名称已存在",
    "800006": "用户没有创建用户的权限",
    "800007": "用户权限异常",
    "800008": "团队中还有人员未移除该团队，请移除后再试",
    "800009": "该用户还有未处理的案件，请处理",
    "800010": "账户未激活",

    "800011": "请联系后台人员激活",
    "800012": ""
}

log_info_dict = {
    "1001": "简单系统日志",
}

# file_path = "/home/panxiuqiang/WebGUI1.1/WebGUI/static/media/"
file_path = "/home/panxiuqiang/txd_web/txdweb1/static/media/"
admin_name = "系统管理员"

sys_admin = "0"
enterprise_admin = "1"
team_admin = "2"
staff = "3"

operation_state = {
    1: "收藏",
    2: "浏览",
    3: "已结束"
}

appid = "wxe3c1ee61f39f53db"
secret = "058124f7e882b9b860f89f9d434db2f4"


class ResponseCodes(object):
    """
        this is send response code break a status dick body、
        if you want acquire a message from response you need send parameter
        parameter:
                    result : back body
                    operation : prompt content
    """

    def __init__(self, result=None, operation=None):
        self.result = result
        self.operation = operation

    def success(self):
        response = {"msg": "", "code": 1}
        if self.result:
            response['result'] = self.result
        if self.operation:
            response['msg'] = self.operation
        else:
            response['msg'] = '成功'
        return response

    def failed(self):
        response = {"msg": "", "code": 417}
        if self.result:
            response['result'] = self.result
        if self.operation:
            response['msg'] = self.operation
        else:
            response['msg'] = '方法执行失败'
        return response

    def error(self):
        response = {"msg": "", "code": 500}
        if self.result:
            response['result'] = self.result
        if self.operation:
            response['msg'] = self.operation
        else:
            response['msg'] = '服务器内部错误'
        return response

    def lose(self):
        response = {"msg": "", "code": 404}
        if self.result:
            response['result'] = self.result
        if self.operation:
            response['msg'] = self.operation
        else:
            response['msg'] = '资源丢失'
        return response

    def api_success(self):
        response = {"msg": "", "code": 0}
        if self.result:
            response['result'] = self.result
        if self.operation:
            response['msg'] = self.operation
        else:
            response['msg'] = '成功'
        return response

    def api_failed(self):
        response = {"msg": "", "code": 1}
        if self.result:
            response['result'] = self.result
        if self.operation:
            response['msg'] = self.operation
        else:
            response['msg'] = '失败'
        return response

    def token_timeout(self):
        response = {"msg": "", "code": 1}
        if self.result:
            response['result'] = self.result
        if self.operation:
            response['msg'] = self.operation
        else:
            response['msg'] = 'token过期'
        return response

    def api_unconfirmed(self):
        response = {"msg": "", "code": 2}
        if self.result:
            response['result'] = self.result
        if self.operation:
            response['msg'] = self.operation
        else:
            response['msg'] = '失败'
        return response
