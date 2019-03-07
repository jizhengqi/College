package com.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.ModuleService;

@Controller
@RequestMapping("module")
public class ModuleController {
	
	@Resource
	ModuleService ms;
	
	// 查询所有语言和语言板块
	@RequestMapping("queryAll")
	@ResponseBody
	public List<Map<String,Object>> queryAll(){
		List<Map<String, Object>> list = ms.queryAll();
		return list;
	}
}
