#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import glob
from datetime import datetime

def extract_info(js_content, js_path):
    """从JS文件中提取重写规则信息"""
    
    # 提取脚本名称（通常是注释的第一行）
    name_match = re.search(r'/\*+\s*(.+?)[\r\n]', js_content)
    name = name_match.group(1).strip() if name_match else "未知脚本"
    
    # 尝试匹配各种不同类型的重写规则
    pattern = None
    rule_type = None
    redirect_to = None
    
    # 匹配script-response-body类型
    response_body_match = re.search(r'(https?:\/\/[^\s]+)\s+url\s+script-response-body', js_content)
    if response_body_match:
        pattern = response_body_match.group(1)
        rule_type = "script-response-body"
    
    # 匹配script-request-header类型
    if not pattern:
        request_header_match = re.search(r'(https?:\/\/[^\s]+)\s+url\s+script-request-header', js_content)
        if request_header_match:
            pattern = request_header_match.group(1)
            rule_type = "script-request-header"
    
    # 匹配script-request-body类型
    if not pattern:
        request_body_match = re.search(r'(https?:\/\/[^\s]+)\s+url\s+script-request-body', js_content)
        if request_body_match:
            pattern = request_body_match.group(1)
            rule_type = "script-request-body"
    
    # 匹配script-echo-response类型
    if not pattern:
        echo_match = re.search(r'(https?:\/\/[^\s]+)\s+url\s+script-echo-response', js_content)
        if echo_match:
            pattern = echo_match.group(1)
            rule_type = "script-echo-response"
    
    # 匹配reject类型
    if not pattern:
        reject_match = re.search(r'(https?:\/\/[^\s]+)\s+url\s+reject(?:\s|$)', js_content)
        if reject_match:
            pattern = reject_match.group(1)
            rule_type = "reject"
    
    # 匹配reject-dict类型
    if not pattern:
        reject_dict_match = re.search(r'(https?:\/\/[^\s]+)\s+url\s+reject-dict(?:\s|$)', js_content)
        if reject_dict_match:
            pattern = reject_dict_match.group(1)
            rule_type = "reject-dict"
    
    # 匹配reject-img类型
    if not pattern:
        reject_img_match = re.search(r'(https?:\/\/[^\s]+)\s+url\s+reject-img(?:\s|$)', js_content)
        if reject_img_match:
            pattern = reject_img_match.group(1)
            rule_type = "reject-img"
    
    # 匹配reject-200类型
    if not pattern:
        reject_200_match = re.search(r'(https?:\/\/[^\s]+)\s+url\s+reject-200(?:\s|$)', js_content)
        if reject_200_match:
            pattern = reject_200_match.group(1)
            rule_type = "reject-200"
    
    # 匹配302重定向类型
    if not pattern:
        redirect_302_match = re.search(r'(https?:\/\/[^\s]+)\s+url\s+302\s+(https?:\/\/[^\s]+)', js_content)
        if redirect_302_match:
            pattern = redirect_302_match.group(1)
            redirect_to = redirect_302_match.group(2)
            rule_type = "redirect-302"
    
    # 匹配307重定向类型
    if not pattern:
        redirect_307_match = re.search(r'(https?:\/\/[^\s]+)\s+url\s+307\s+(https?:\/\/[^\s]+)', js_content)
        if redirect_307_match:
            pattern = redirect_307_match.group(1)
            redirect_to = redirect_307_match.group(2)
            rule_type = "redirect-307"
    
    # 匹配header-replace类型
    if not pattern:
        header_replace_match = re.search(r'(https?:\/\/[^\s]+)\s+url\s+response-header\s+([^\s]+)\s*:\s*([^\s]+)\s+([^\s]+)\s*:\s*([^\s]+)', js_content)
        if header_replace_match:
            pattern = header_replace_match.group(1)
            header_original = f"{header_replace_match.group(2)}: {header_replace_match.group(3)}"
            header_replace = f"{header_replace_match.group(4)}: {header_replace_match.group(5)}"
            rule_type = "header-replace"
        else:
            header_original = None
            header_replace = None
            
    # 提取主机名（支持多个主机名，用逗号分隔）
    hostname_match = re.search(r'hostname\s*=\s*(.+?)(?:$|\n)', js_content)
    hostname = hostname_match.group(1).strip() if hostname_match else None
    
    # 获取脚本URL (基于文件名)
    script_name = os.path.basename(js_path)
    script_url = f"https://raw.githubusercontent.com/Yu9191/Rewrite/main/{script_name}"
    
    return {
        "name": name,
        "pattern": pattern,
        "hostname": hostname,
        "script_url": script_url,
        "rule_type": rule_type,
        "redirect_to": redirect_to,
        "header_original": header_original if 'header_original' in locals() else None,
        "header_replace": header_replace if 'header_replace' in locals() else None,
    }

def ensure_directory_exists(directory):
    """确保目录存在，如不存在则创建"""
    if not os.path.exists(directory):
        os.makedirs(directory)

def create_surge_module(info, js_path):
    """生成Surge模块文件"""
    current_date = datetime.now().strftime("%Y.%m.%d")
    
    # 根据规则类型构建不同的模块内容
    if info["rule_type"] == "script-response-body":
        script_section = f"""[Script]
{info["name"]} = type=http-response, pattern={info["pattern"]}, script-path={info["script_url"]}, requires-body=true, max-size=-1, timeout=60

"""
    elif info["rule_type"] == "script-request-header":
        script_section = f"""[Script]
{info["name"]} = type=http-request, pattern={info["pattern"]}, script-path={info["script_url"]}, timeout=60

"""
    elif info["rule_type"] == "script-request-body":
        script_section = f"""[Script]
{info["name"]} = type=http-request, pattern={info["pattern"]}, script-path={info["script_url"]}, requires-body=true, max-size=-1, timeout=60

"""
    elif info["rule_type"] == "script-echo-response":
        script_section = f"""[Script]
{info["name"]} = type=http-request, pattern={info["pattern"]}, script-path={info["script_url"]}, timeout=60, script-update-interval=0

"""
    elif info["rule_type"] in ["redirect-302", "redirect-307"]:
        status_code = "307" if info["rule_type"] == "redirect-307" else "302"
        script_section = f"""[URL Rewrite]
{info["pattern"]} {info["redirect_to"]} {status_code}

"""
    elif info["rule_type"] in ["reject", "reject-dict", "reject-img", "reject-200"]:
        # Surge使用不同的拒绝类型
        reject_map = {
            "reject": "-",
            "reject-dict": "-dict",
            "reject-img": "-img",
            "reject-200": "-200"
        }
        reject_type = reject_map.get(info["rule_type"], "-")
        script_section = f"""[URL Rewrite]
{info["pattern"]} - reject{reject_type}

"""
    elif info["rule_type"] == "header-replace":
        script_section = f"""[Header Rewrite]
{info["pattern"]} header-replace {info["header_original"]} {info["header_replace"]}

"""
    else:
        # 默认情况，未知类型
        script_section = f"""[Script]
{info["name"]} = type=http-response, pattern={info["pattern"]}, script-path={info["script_url"]}, requires-body=true, max-size=-1, timeout=60

"""
    
    # 构建完整模块内容
    content = f"""#!name={info["name"]}
#!desc={info["name"]}（更新时间：{current_date}）
#!icon=https://m.360buyimg.com/i/jfs/t1/311854/8/2935/14637/682dda6eF77c789c1/9a4c5ed64ab9b33b.png

{script_section}[MITM]
hostname = %APPEND% {info["hostname"]}
"""
    
    # 确保Surge目录存在
    ensure_directory_exists('ReTra/Surge')
    
    # 写入文件
    file_name = os.path.basename(js_path).replace('.js', '.sgmodule')
    module_path = os.path.join('ReTra/Surge', file_name)
    with open(module_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"已生成Surge模块: {module_path}")

def create_loon_plugin(info, js_path):
    """生成Loon插件文件"""
    current_date = datetime.now().strftime("%Y.%m.%d")
    
    # 根据规则类型构建不同的模块内容
    if info["rule_type"] == "script-response-body":
        script_section = f"""[Script]
http-response {info["pattern"]} script-path={info["script_url"]}, requires-body=true, timeout=60, tag={info["name"]}

"""
    elif info["rule_type"] == "script-request-header":
        script_section = f"""[Script]
http-request {info["pattern"]} script-path={info["script_url"]}, timeout=60, tag={info["name"]}

"""
    elif info["rule_type"] == "script-request-body":
        script_section = f"""[Script]
http-request {info["pattern"]} script-path={info["script_url"]}, requires-body=true, timeout=60, tag={info["name"]}

"""
    elif info["rule_type"] == "script-echo-response":
        script_section = f"""[Script]
http-request {info["pattern"]} script-path={info["script_url"]}, timeout=60, tag={info["name"]}

"""
    elif info["rule_type"] in ["redirect-302", "redirect-307"]:
        # Loon doesn't distinguish between 302 and 307, just uses general rewrite
        script_section = f"""[URL Rewrite]
{info["pattern"]} {info["redirect_to"]}

"""
    elif info["rule_type"] in ["reject", "reject-dict", "reject-img", "reject-200"]:
        # Loon使用统一的reject方式
        script_section = f"""[URL Rewrite]
{info["pattern"]} - reject

"""
    elif info["rule_type"] == "header-replace":
        script_section = f"""[Header Rewrite]
{info["pattern"]} {info["header_original"]} {info["header_replace"]}

"""
    else:
        # 默认情况，未知类型
        script_section = f"""[Script]
http-response {info["pattern"]} script-path={info["script_url"]}, requires-body=true, timeout=60, tag={info["name"]}

"""
    
    # 构建完整插件内容
    content = f"""#!name={info["name"]}
#!desc={info["name"]}（更新时间：{current_date}）
#!icon=https://m.360buyimg.com/i/jfs/t1/311854/8/2935/14637/682dda6eF77c789c1/9a4c5ed64ab9b33b.png

{script_section}[MITM]
hostname = {info["hostname"]}
"""
    
    # 确保Loon目录存在
    ensure_directory_exists('ReTra/Loon')
    
    # 写入文件
    file_name = os.path.basename(js_path).replace('.js', '.plugin')
    plugin_path = os.path.join('ReTra/Loon', file_name)
    with open(plugin_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"已生成Loon插件: {plugin_path}")

# 主函数
if __name__ == "__main__":
    # 查找所有JS文件
    js_files = glob.glob('*.js')
    
    for js_path in js_files:
        print(f"处理文件: {js_path}")
        
        # 获取文件名
        file_name = os.path.basename(js_path)
        
        # 检查是否已经存在对应的模块和插件文件
        module_path = os.path.join('ReTra/Surge', file_name.replace('.js', '.sgmodule'))
        plugin_path = os.path.join('ReTra/Loon', file_name.replace('.js', '.plugin'))
        
        # 如果模块和插件都已存在，则跳过
        if os.path.exists(module_path) and os.path.exists(plugin_path):
            print(f"跳过已存在的文件: {js_path}")
            continue
        
        # 读取JS文件内容
        try:
            with open(js_path, 'r', encoding='utf-8') as f:
                js_content = f.read()
                
            # 提取信息
            info = extract_info(js_content, js_path)
            
            # 检查必要信息是否齐全
            if not info["pattern"] or not info["hostname"]:
                print(f"警告: {js_path} 缺少必要信息，跳过")
                continue
                
            # 创建Surge模块和Loon插件
            if not os.path.exists(module_path):
                create_surge_module(info, js_path)
            
            if not os.path.exists(plugin_path):
                create_loon_plugin(info, js_path)
                
        except Exception as e:
            print(f"处理 {js_path} 时出错: {str(e)}") 
