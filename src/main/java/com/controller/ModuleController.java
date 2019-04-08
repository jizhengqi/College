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

	Integer rs;

	// 查询所有语言和语言板块
	@RequestMapping("queryAll")
	@ResponseBody
	public List<Map<String, Object>> queryAll() {
		List<Map<String, Object>> list = ms.queryAll();
		return list;
	}

	/**
	 * 根据语言模块查询所有课程
	 * 
	 */
	@RequestMapping("queryByModule")
	@ResponseBody
	public List<Curriculum> queryByModule(String m_name, Integer c_vip,
			Integer c_level) {
		List<Curriculum> list = ms.queryByModule(m_name, c_vip, c_level);
		return list;
	}

	// 添加语言模块
	@RequestMapping("add")
	@ResponseBody
	public Integer add(Module m) {
		ms.add(m);
		rs = 1;
		return rs;
	}

	// 修改语言模块
	@RequestMapping("upd")
	@ResponseBody
	public Integer upd(Module m) {
		ms.upd(m);
		rs = 1;
		return rs;
	}

	// 删除语言模块
	@RequestMapping("del")
	@ResponseBody
	public Integer del(Integer m_id) {
		ms.del(m_id);
		rs = 1;
		return rs;
	}

	// 查询语言分类
	@RequestMapping("selectAll")
	@ResponseBody
	public List<Module> selectAll() {
		List<Module> list = ms.SelectAll();
		return list;
	}

	// 查询所有语言分类
	@RequestMapping("queryModule")
	@ResponseBody
	public Map<String, Object> queryModule(Integer page, Integer limit) {
		List<Module> list = ms.SelectAll();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", "");
		map.put("code", 0);
		map.put("count", ms.SelectAll().size());
		map.put("data", ms.SelectByL_id((page - 1) * limit, limit));
		return map;
	}

}
