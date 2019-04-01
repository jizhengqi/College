package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Curriculum;
import com.entity.Module;
import com.service.ModuleService;

@Controller
@RequestMapping("module")
public class ModuleController {

	@Resource
	ModuleService ms;

	// 查询所有语言和语言板块
	@RequestMapping("queryAll")
	@ResponseBody
	public List<Map<String, Object>> queryAll() {
		List<Map<String, Object>> list = ms.queryAll();
		return list;
	}

	/**
	 * 根据语言模块查询所有课程1
	 * 
	 */
	@RequestMapping("queryByModule")
	@ResponseBody
	public List<Curriculum> queryByModule(String m_name) {
		List<Curriculum> list = ms.queryByModule(m_name);
		return list;
	}
	
	// 查询所有语言分类
	@RequestMapping("queryModule")
	@ResponseBody
	public Map<String,Object> queryModule(Integer page,Integer limit){
		List<Module> list = ms.SelectAll();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("msg", "");
		map.put("code", "");
		map.put("count", ms.SelectAll().size());
		map.put("data", ms.queryModule((page-1)*limit, limit));
		return map;
	}
	
	
}
