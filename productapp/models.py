from django.db import models
from django.utils import timezone
from django.utils.html import format_html
from django.forms import ClearableFileInput
from django.template import loader
from django.utils.safestring import mark_safe
from django.forms import ModelForm
from django import forms

# 产品类型
product_type_list = (("1", 'VPX系统'),
                     ("2", '解决方案'))
# 产品状态
product_state_list = (("1", '在售'),
                      ("2", '已下架'), ("3", '停产'))
# 产品生产周期
production_cycle_list = (("1", '10天交付'),
                         ("2", '30天交付'), ("3", '45天交付'), ("4", '60天交付'),
                         ("5", '90天交付'), ("6", '半年及以上'))


# Create your models here.
# 商品表单
class Product(models.Model):
    # ... other fields

    product_id = models.AutoField(primary_key=True)  # 商品的id
    product_number = models.CharField(max_length=200, verbose_name='商品编号', blank=False)  # 商品的uuid
    product_uuid = models.CharField(max_length=200, verbose_name='商品编号', blank=False)  # 商品的uuid
    create_time = models.DateTimeField(default=timezone.now, verbose_name='创建时间', blank=False)  # 商品创建时间
    last_updateTime = models.DateTimeField(default=timezone.now, verbose_name='最后一次修改时间', blank=False)  # 商品修改时间
    product_type = models.CharField(max_length=200, verbose_name='商品类型', blank=False, choices=product_type_list)  # 商品类型
    product_state = models.CharField(max_length=200, verbose_name='商品状态', blank=False,
                                     choices=product_state_list)  # 商品状态
    product_name = models.CharField(max_length=200, verbose_name='商品名称', blank=False)  # 商品名称
    product_address = models.CharField(max_length=200, verbose_name='商品地址', blank=False)  # 商品地址
    product_body = models.CharField(max_length=200, verbose_name='商品内容', blank=False)  # 商品内容
    product_describe = models.TextField(verbose_name='商品描述', max_length=4000)  # 商品描述
    product_size = models.CharField(max_length=200, verbose_name='商品尺寸', blank=False)  # 商品尺寸
    product_owner = models.CharField(max_length=200, verbose_name='商品负责人', blank=False)  # 商品类型
    production_cycle = models.CharField(max_length=200, verbose_name='商品生产周期', blank=False,
                                        choices=production_cycle_list)  # 商品生产周期
    product_image = models.ImageField(upload_to='images/', verbose_name='图片', null=True)

    Baidu_web_disk_address = models.CharField(max_length=200, verbose_name='百度网站地址', blank=False)  # 百度网站地址
    verification_code = models.CharField(max_length=200, verbose_name='百度验证码', blank=False)  # 百度验证码

    board_series = models.CharField(max_length=200, verbose_name='板卡系列', blank=False)  # 板卡系列
    parameter = models.TextField( verbose_name='参数', blank=False)  # 参数

    def short_content(self):
        if len(str(self.product_describe)) > 100:
            return '{}...'.format(str(self.product_describe)[0:100])
        else:
            return str(self.product_describe)

    short_content.allow_tags = True

    def __str__(self):
        return str(self.product_id)

    def image_data(self):
        if self.product_image:
            return format_html(
                '<img src="/media/{}" width="156px" height="98px"/>',
                self.product_image,
            )
        else:
            return format_html(
                '<img src="/media/无拍照上传.png" width="156px" height="98px"/>',
            )

    # 填写表单里面并没有配置图片，可以根据自己的需求修改配置
    def image_admin(self):
        return format_html(
            '<img src="{}" width="440px" height="275px"/>',
            self.product_image,
        )

    class Meta:
        db_table = 'product_info'  # 通过db_table自定义数据表名
        verbose_name = '商品'
        verbose_name_plural = '商品'


class FilePath(models.Model):
    filepath_id = models.AutoField(primary_key=True)
    filepath_uuid = models.CharField(max_length=50, blank=False)  # uuid
    filepath = models.CharField(max_length=200, blank=False)  # 文件地址
    fileType_id = models.CharField(max_length=50, blank=False)  # 文件类型
    update_time = models.DateTimeField(default=timezone.now, blank=False)
    update_user = models.CharField(max_length=50, blank=False)  # 上传用户
    user_id = models.CharField(max_length=50, blank=False)  # 用户id
    file_type = models.CharField(max_length=50, blank=False)  # 文件类型
    old_filename = models.CharField(max_length=50, blank=False)  # 老的文件名称
    team_id = models.CharField(max_length=200, blank=False)  # 团队id
    file_id = models.CharField(max_length=200, blank=False)  # 文件iD

    def __str__(self):
        return str(self.filepath_id)

    class Meta:
        db_table = 'product_filepath'  # 通过db_table自定义数据表名
