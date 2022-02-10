import datetime
import json

from django.shortcuts import render
from .models import Product
from django.http import JsonResponse, HttpResponse
from txdweb import public_function
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from txdweb.read_file import FileOperation, file_type, chinese_and_code
from txdweb.public_function import ErrorDataFormat, SuccessDataFormat, sys_code  # 成功和失败的返回信息
from WebsiteManagementapp.models import IntroductionAddress
from loginapp.views import params


# Create your views here.
def product_index(request):
    return render(request, 'index/index.html')


def product_details(request):
    return render(request, 'index/a_project.html')


def product_file(request):
    return render(request, 'index/files.html')


@params("系统日志", '进入后台管理界面', 1)
def web_product_list(request):
    return render(request, 'Product/product_list.html')


def web_product_info(request):
    product_uuid = request.GET.get('product_uuid', '')
    return render(request, 'Product/a_product.html', {'product_uuid': product_uuid})


def web_product_add(request):
    product_uuid = request.GET.get('product_uuid', '')
    return render(request, 'Product/add_product.html', {'product_uuid': product_uuid})


# about_us.html     关于我们
def web_about_us(request):
    return render(request, 'testartek/about_us.html')


# contact_us    联系我们
def web_contact_us(request):
    return render(request, 'testartek/contact_us.html')


# news.html    新闻中心
def web_news(request):
    return render(request, 'testartek/news.html')


# serves.html    服务与支持
def web_serves(request):
    return render(request, 'testartek/serves.html')


# all_products.html    产品展示
def web_all_products(request):
    return render(request, 'testartek/all_products.html')


def product_a(request):
    if request.method == 'GET':
        product_uuid = request.GET.get("product_id", "")
        res = Product.objects.filter(product_uuid=product_uuid).all().values()
        for i in res:
            obj_uuid_dict = FileOperation.produce_file_uuid(i["product_uuid"], 'product')
            filepath_dict = FileOperation.send_uuid_back_path_nofile(
                obj_uuid_dict)
            i['filepath_dict'] = filepath_dict
            # print(filepath_dict, 4444)

        result = public_function.SuccessDataFormat(
            chMessage=public_function.sys_code["210014"],
            code=1,
            data=res,
            serialize=True).result()
        print(result, 444444444)
        for i in result["data"]:
            i["parameter"] = eval(i["parameter"])

        return JsonResponse(result, safe=False)
    result = public_function.ErrorDataFormat(
        chMessage=public_function.sys_code["410011"]).result()
    return JsonResponse(result, safe=False)


def product_all(request):
    if request.method == 'GET':
        # print(request.GET,444444)
        # product_a(request.body,4445)
        limit = request.GET.get("limit", 10)
        page = request.GET.get("page", 1)
        product_name = request.GET.get("product_name", "")
        res = Product.objects.filter(product_name__contains=product_name).values()
        for i in res:
            obj_uuid_dict = FileOperation.produce_file_uuid(i["product_uuid"], 'product')
            filepath_dict = FileOperation.send_uuid_back_path_nofile(
                obj_uuid_dict)
            i['filepath_dict'] = filepath_dict
            # print(filepath_dict, 4444)

        paginator = Paginator(res, limit)
        try:
            contacts = paginator.page(page)
        except PageNotAnInteger:
            contacts = paginator.page(1)
        except EmptyPage:
            contacts = paginator.page(paginator.num_pages)
        result = public_function.SuccessDataFormat(
            chMessage=public_function.sys_code["210014"],
            code=1,
            data=contacts,
            serialize=True).result()
        for i in result["data"]:
            print(i, 555555)
            i["parameter"] = eval(i["parameter"])

        result['count'] = paginator.count
        result['page'] = (paginator.count + int(limit) - 1) // int(limit)
        return JsonResponse(result, safe=False)
    result = public_function.ErrorDataFormat(
        chMessage=public_function.sys_code["410011"]).result()
    return JsonResponse(result, safe=False)


# 添加标的物信息
# @params(log_info_dict['1001'], '添加了一条标的物信息', 3)
def product_object_add(request):
    if request.method == 'POST':
        print(request.body, 4444)
        # print(json.loads(request.body),4444)
        print(request.POST, 98999898)
        product_number = request.POST.get('product_number')  # 商品编号
        product_type = request.POST.get('product_type')  # 商品类型
        product_state = request.POST.get('product_state')  # 商品状态
        product_name = request.POST.get('product_name')  # 商品名称
        product_address = request.POST.get('product_address')  # 商品地址
        product_body = request.POST.get('product_body', "")  # 商品内容
        product_describe = request.POST.get('product_describe', "")  # 商品描述
        product_owner = request.POST.get('product_owner', "")  # 商品负责人
        production_cycle = request.POST.get('production_cycle')  # 商品生产周期
        board_series = request.POST.get('board_series')  # 板卡类型
        parameter = json.loads(request.POST.get('parameter'))  # 板卡参数
        product_size = request.POST.get('product_size')  # 板卡参数
        print(parameter, type(parameter), 666666)
        print(request.POST, 98999898)
        pictures_show_file = request.FILES.getlist(
            'pictures_show_file')  # 标的物照片  jpg
        more_pictures_file = request.FILES.getlist(
            'more_pictures_file')  # 标的调查表  doc
        pdf_pictures_file = request.FILES.getlist(
            'pdf_pictures_file')  # 标的调查表  doc
        Baidu_web_disk_address = request.POST.get('Baidu_web_disk_address', '')  # product_uuid
        verification_code = request.POST.get('verification_code', '')  # product_uuid
        product_uuid = request.POST.get('product_uuid', '')  # product_uuid
        obj_uuid = FileOperation.produce_file_uuid(product_uuid, 'product')
        print(pictures_show_file, 2222)
        print(more_pictures_file, 4345)
        print(pdf_pictures_file, 1123123)
        pdf_uuid = obj_uuid['pdf_uuid']  # pdf文件说明书
        user_id = team = 1  #
        """
        ("show", "商品介绍"),  # Confirmation of Delivery
        ("more", "商品详情"),  # invoice
        ("pdf", "pdf说明书")  # invoice
        """
        # print(request.POST, 333)
        more_uuid = obj_uuid['more_uuid']  # 标的物照片生成的uuid
        show_uuid = obj_uuid['show_uuid']  # 标的调查表生成的uuid
        if pdf_uuid:
            if not FileOperation.file_update_function(
                    file_object=pdf_pictures_file,
                    filepath_uuid=pdf_uuid,
                    ft_id=file_type['1012'],
                    user_id=user_id,
                    team=team):
                # 传输文件大于9
                result = ErrorDataFormat(
                    chMessage=sys_code["410012"]).result()
                return JsonResponse(result, safe=False)
        if more_pictures_file:
            """
            "1010": "商品介绍",  # Confirmation of Delivery
            "1011": "商品详情",  # invoice
            "1012": "pdf说明书
            """
            if not FileOperation.file_update_function(
                    file_object=more_pictures_file,
                    filepath_uuid=more_uuid,
                    ft_id=file_type['1011'],

                    user_id=user_id, team=team):
                # 传输文件大于9
                result = ErrorDataFormat(
                    chMessage=sys_code["410012"]).result()
                return JsonResponse(result, safe=False)
        if pictures_show_file:
            if not FileOperation.file_update_function(
                    file_object=pictures_show_file,
                    filepath_uuid=show_uuid,
                    ft_id=file_type['1010'],
                    user_id=user_id, team=team):
                # 传输文件大于9
                result = ErrorDataFormat(
                    chMessage=sys_code["410012"]).result()
                return JsonResponse(result, safe=False)
        # if announcement_time:
        # print(product_uuid, 33333444)
        last_updateTime = create_time = datetime.datetime.now()
        Product.objects.create(
            product_size=product_size,
            product_number=product_number,
            product_uuid=product_uuid,
            create_time=create_time,
            last_updateTime=last_updateTime,
            product_type=product_type,
            product_state=product_state,
            product_name=product_name,
            product_address=product_address,
            product_body=product_body,
            product_describe=product_describe,
            product_owner=product_owner,
            production_cycle=production_cycle,
            Baidu_web_disk_address=Baidu_web_disk_address,
            verification_code=verification_code,
            board_series=board_series,
            parameter=parameter
        )

        result = SuccessDataFormat(
            chMessage=sys_code["210015"], code=1).result()
        print(result, 44444)
        return JsonResponse(result, safe=False)

    result = ErrorDataFormat(
        chMessage=sys_code["410011"]).result()
    return JsonResponse(result, safe=False)


def product_object_edit(request):
    if request.method == 'GET':
        product_number = request.GET.get('product_number', '')  # 商品编号
        product_type = request.GET.get('product_type', '')  # 商品类型
        product_state = request.GET.get('product_state', '')  # 商品状态
        product_name = request.GET.get('product_name', '')  # 商品名称
        product_address = request.GET.get('product_address', '')  # 商品地址
        product_body = request.GET.get('product_body', '')  # 商品内容
        product_describe = request.GET.get('product_describe', '')  # 商品描述
        product_owner = request.GET.get('product_owner', "")  # 商品负责人
        production_cycle = request.GET.get('production_cycle', '')  # 商品生产周期
        Baidu_web_disk_address = request.GET.get('Baidu_web_disk_address', '')  # product_uuid
        verification_code = request.GET.get('verification_code', '')  # product_uuid
        product_uuid = request.GET.get('product_uuid', '')  # product_uuid
        board_series = request.GET.get('board_series')  # 板卡类型
        parameter = json.loads(request.GET.get('parameter'))  # 板卡参数
        product_size = request.GET.get('product_size')  # 板卡参数
        lco = Product.objects.get(product_uuid=product_uuid)
        if product_size:
            lco.product_size = product_size
        if product_number:
            lco.product_number = product_number
        if product_type:
            lco.product_type = product_type
        if product_state:
            lco.product_state = product_state
        if product_name:
            lco.product_name = product_name
        if product_address:
            lco.product_address = product_address
        if product_body:
            lco.product_body = product_body
        if product_describe:
            lco.product_describe = product_describe
        if product_owner:
            lco.product_owner = product_owner
        if production_cycle:
            lco.production_cycle = production_cycle
        if Baidu_web_disk_address:
            lco.Baidu_web_disk_address = Baidu_web_disk_address
        if verification_code:
            lco.verification_code = verification_code
        if board_series:
            lco.board_series = board_series
        if parameter:
            lco.parameter = parameter
        lco.save()
        result = SuccessDataFormat(
            chMessage=sys_code["210015"], code=1).result()
        return JsonResponse(result, safe=False)
    result = ErrorDataFormat(
        chMessage=sys_code["410011"]).result()
    return JsonResponse(result, safe=False)


def product_object_delete(request):
    if request.method == 'POST':
        product_uuid = request.POST['product_uuid']  # 标的物id
        obj_uuid_dict = FileOperation.produce_file_uuid(product_uuid, 'product')
        if FileOperation.file_remove_function(obj_uuid_dict):
            obj = Product.objects.get(product_uuid=product_uuid)
            obj.delete()
        result = SuccessDataFormat(
            chMessage=sys_code["210012"], code=1).result()
        return JsonResponse(result, safe=False)
    result = ErrorDataFormat(
        chMessage=sys_code["410011"]).result()
    return JsonResponse(result, safe=False)


def file_updates(request):  # 小程序使用
    if request.method == "POST":
        last_updateTime = datetime.datetime.now()
        file_object = request.FILES.getlist('file')  # 图片文件
        object_id = request.POST.get('product_uuid', "")  # 所属uuid
        filepath_type = request.POST.get('filepath_type')  # ('as', 'op', 'oi', 'of', "cd", "iv")...
        filepath_uuid = object_id + filepath_type
        print(request.POST, 44444)
        print(request.FILES, 6666)

        print(132123123123123123123)
        print(123123123)

        username = file_id = team = 1
        ft = ''
        for i in chinese_and_code:
            if i[0] == filepath_type:
                ft = filepath_type
        # print(len(file_object), 66666)
        if len(file_object) < 9:
            for i in file_object:
                fid = FileOperation.file_update_function_procedure(
                    file_object=i,
                    filepath_uuid=filepath_uuid,
                    ft_id=ft,
                    user_id=username, object_id=object_id, team=team, file_id=file_id, last_updateTime=last_updateTime)
        else:
            # 传输文件大于9
            result = ErrorDataFormat(
                chMessage=sys_code["410012"]).result()
            # #print(result, 33333344444)
            return JsonResponse(result, safe=False)
        result = SuccessDataFormat(
            chMessage=sys_code["210017"]).result()
        return JsonResponse(result, safe=False)
    result = SuccessDataFormat(
        chMessage=sys_code["210017"]).result()
    return JsonResponse(result, safe=False)


def file_remove(request):
    if request.method == "GET":
        filepath_id = request.GET["filepath_id"]
        # #print(filepath_id, 4444444444)
        if FileOperation.send_filepath_id_file_remove(filepath_id):
            # #print(1111111111111111111111111111)
            result = SuccessDataFormat(
                chMessage=sys_code["210012"]).result()
            return JsonResponse(result, safe=False)
            # 210017
        result = ErrorDataFormat(
            chMessage=sys_code["410013"]).result()
        return JsonResponse(result, safe=False)
    else:
        result = ErrorDataFormat(
            chMessage=sys_code["410011"]).result()
        return JsonResponse(result, safe=False)


def file_list(request):
    if request.method == "GET":
        file_name = request.GET.get("file_name")
        if file_name:
            res = IntroductionAddress.objects.filter(product_presentation__contains=file_name).all().values()
        else:
            res = IntroductionAddress.objects.filter().all().values()
        limit = request.GET.get("limit", 10)
        page = request.GET.get("page", 1)

        paginator = Paginator(res, limit)
        try:
            contacts = paginator.page(page)
        except PageNotAnInteger:
            contacts = paginator.page(1)
        except EmptyPage:
            contacts = paginator.page(paginator.num_pages)
        result = public_function.SuccessDataFormat(
            chMessage=public_function.sys_code["210014"],
            code=1,
            data=contacts,
            serialize=True).result()
        result['count'] = paginator.count
        result['page'] = (paginator.count + int(limit) - 1) // int(limit)
        return JsonResponse(result, safe=False)
    else:
        result = ErrorDataFormat(
            chMessage=sys_code["410011"]).result()
        return JsonResponse(result, safe=False)
