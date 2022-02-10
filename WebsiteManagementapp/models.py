from django.db import models
from django.utils import timezone


# Create your models here.

# 网站管理
class Website(models.Model):
    website_id = models.AutoField(primary_key=True)  # 网站id
    website_uuid = models.CharField(max_length=200, verbose_name='网站唯一编码', blank=False)  # 网站的uuid
    create_time = models.DateTimeField(default=timezone.now, verbose_name='创建时间', blank=False)  # 网站创建时间
    website_name = models.CharField(max_length=200, verbose_name='网站名称', blank=False)  # 网站名称
    background_image = models.ImageField(upload_to='images/', verbose_name='网站首页背景图片', null=True)  # 网站背景图
    website_logo = models.ImageField(upload_to='images/', verbose_name='网站logo', null=True)  # 网站logo

    def __str__(self):
        return str(self.website_id)

    class Meta:
        db_table = 'website_info'  # 通过db_table自定义数据表名
        verbose_name = '网站配置'
        verbose_name_plural = '基础信息'


# File Introduction Address

# 网站管理
class IntroductionAddress(models.Model):
    address_id = models.AutoField(primary_key=True)  # 网络下载id
    address_uuid = models.CharField(max_length=200, verbose_name='网站唯一编码', blank=False)  # 网络下载的uuid
    create_time = models.DateTimeField(default=timezone.now, verbose_name='创建时间', blank=False)  # 网站创建时间
    product_presentation = models.CharField(max_length=200, verbose_name='产品介绍', blank=False)  # 产品介绍
    product_url = models.CharField(max_length=200, verbose_name='产品下载地址', blank=False)  # 产品下载地址
    product_code = models.CharField(max_length=200, verbose_name='产品下载验证码', blank=False)  # 产品下载验证码
    product_name = models.CharField(max_length=200, verbose_name='产品名称', blank=False)  # 产品名称

    def __str__(self):
        return str(self.address_id)

    class Meta:
        db_table = 'introduction_Address'  # 通过db_table自定义数据表名
        verbose_name = '百度网盘文件'
        verbose_name_plural = '百度网盘文件地址'
