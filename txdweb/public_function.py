"""
    time:20210305
    author : pxq
"""
import datetime
import requests
import json

from txdweb.web_conf import secret, appid

log_info_dict = {
    "1001": "简单系统日志",
}

sys_code = {
    # success
    "210011": "数据添加成功",
    "210012": "数据删除成功",
    "210013": "数据修改成功",
    "210014": "获取数据成功",
    "210015": "数据保存成功",
    "210016": "数据查询成功",
    "210017": "文件上传成功",
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

}


class MyError(Exception):  # 自定义的报错信息展示 MyError
    def __init__(self, msg):
        self.msg = msg

    def __str__(self):
        return self.msg


class DataFormatBase:
    WebStatus_code = 1  # code类型为1时，操作成功

    def __init__(
            self,
            code=None,
            chMessage=None,
            enMessage="eng",
            data=None,
            serialize=False):
        self._result = {}
        # print(enMessage,333333333333333)
        self._enMessage = enMessage  # 英文注释
        self._chMessage = chMessage  # 中文注释
        self._data = data  # body内容
        self._code = code  # 返回状态
        self.time = self.gettime()
        self.serialize = serialize

    def __repr__(self):
        return '<%(cls)s chMessage=%(chMessage)s%(data)s code=%(code)s>' % {
            'cls': self.__class__.__name__,
            'chMessage': self._chMessage,
            'data': self._data,
            'code': self.WebStatus_code}

    @property
    def chMessage(self):
        if self._chMessage is not None:
            return self._chMessage
        return " 未设置返回信息 <<< No Settings information"

    @chMessage.setter
    def chMessage(self, value):
        self._chMessage = value

    @property
    def data(self):
        if self._data is not None:
            return self._data
        return '[]'

    @data.setter
    def data(self, value):
        self._data = value

    @property
    def code(self):
        if self._code is not None:
            if isinstance(self._code, int):
                return self._code
            else:
                raise MyError("code格式错误,code必须为int型")
        return 1

    @code.setter
    def code(self, value):
        self._code = value

    def joint(self):
        if self._code is not None:
            self._result["code"] = self.code
        else:
            self._result["code"] = self.WebStatus_code
        self._result["chMessage"] = self.chMessage
        self._result["Message"] = self.chMessage  # 预留的一个字段，需改进！
        # print(self._make_enMessage(),333333333333333333333333333222)
        self._result["enMessage"] = self._enMessage
        if self.serialize:
            self._result["data"] = self._serialize(self._data)
        else:
            self._result["data"] = self._data
        self._result["createtime"] = str(self.time)
        return self._result

    def _make_enMessage(self):
        """
            这个位置准备使用第三方模块进行中英互换，目前还没有加入该模块
        """
        return self._enMessage is not None

    def gettime(self):
        dt = datetime.datetime.now()
        return dt.strftime('%Y%m%d %H:%M:%S')

    def _serialize(self, data):
        _data = []
        for i in data:
            _data.append(i)
        return _data


class SuccessDataFormat(DataFormatBase):
    WebStatus_code = 1

    def __init__(self, data=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.data = data

    def result(self):
        return self.joint()


class ErrorDataFormat(DataFormatBase):
    WebStatus_code = 0

    def __init__(self, data=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.data = data

    def result(self):
        return self.joint()


def get_weixin(js_code):
    url = "https://api.weixin.qq.com/sns/jscode2session?" + "appid={}&secret={}&js_code={}&grant_type=authorization_code".format(
        appid, secret, js_code)
    c_info_all = requests.get(url)
    res = json.loads(c_info_all.text)
    return res


if __name__ == '__main__':
    pass
