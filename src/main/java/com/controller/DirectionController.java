package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Curriculum;
import com.entity.Direction;
import com.entity.Language;
import com.entity.Module;
import com.service.DirectionService;
import com.service.LanguageService;
import com.service.ModuleService;

@Controller
@RequestMapping("direction")
public class DirectionController {

	@Resource
	LanguageService ls;

	@Resource
	ModuleService ms;

	@Resource
	DirectionService ds;

	Integer rs;

	@RequestMapping("queryAll")
	@ResponseBody
	public List<Direction> queryAll() {
		List<Direction> list = ds.queryAll();
		return list;
	}

	// 添加技术方向
	@RequestMapping("add")
	@ResponseBody
	public Integer add(Direction d) {
		ds.add(d);
		rs = 1;
		return rs;
	}

	// 修改技术方向
	@RequestMapping("upd")
	@ResponseBody
	public Integer upd(Direction d) {
		ds.upd(d);
		rs = 1;
		return 1;
	}

	// 删除技术方向
	@RequestMapping("del")
	@ResponseBody
	public Integer del(Integer d_id) {
		List<Language> list = ls.queryByD_id(d_id);
		System.out.println(d_id);
		if (list.size() > 0) {
			rs = 2;
		} else {
			ds.del(d_id);
			rs = 1;
		}
		return rs;
	}

	// 查询所有技术方向
	@RequestMapping("queryDirection")
	@ResponseBody
	public Map<String, Object> queryDirection(Integer page, Integer limit) {
		List<Direction> list = ds.queryAll();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", "");
		map.put("code", "");
		map.put("count", ds.queryAll().size());
		map.put("data", ds.queryDirection((page - 1) * limit, limit));
		return map;
	}

	/*
	 * 根据技术方向查询所有课程
	 */
	@RequestMapping("queryByDirection")
	@ResponseBody
	public List<Curriculum> queryByDirection(String d_name, Model model) {
		List<Curriculum> list = ds.queryByDirection(d_name);
		return list;
	}

	// 属性菜单数据拼接
	@RequestMapping("queryByAll")
	@ResponseBody
	public String queryByAll(Model model) {
		List<Direction> list = ds.queryAll();
		List<Language> lilt = ls.queryAll();
		List<Module> limt = ms.SelectAll();
		String str = new String("");
		for (int i = 0; i < list.size(); i++) {
			str += "{";
			str += "\"id\":\"" + list.get(i).getD_id() + "\"";
			str += ",\"name\":\"" + list.get(i).getD_name() + "\"";
			str += ",\"children\":[";
			for (int j = 0; j < lilt.size(); j++) {
				if (list.get(i).getD_id() == lilt.get(j).getD_id()) {
					str += "{\"id\":\"" + list.get(i).getD_id() + ""
							+ lilt.get(j).getL_id() + "\"";
					str += ",\"name\":\"" + lilt.get(j).getL_name() + "\"";
					str += ",\"children\":[";
					for (int h = 0; h < limt.size(); h++) {
						if (lilt.get(j).getL_id() == limt.get(h).getL_id()) {
							str += "{\"id\":\"" + list.get(i).getD_id() + ""
									+ lilt.get(j).getL_id() + ""
									+ limt.get(h).getM_id() + "\"";
							str += ",\"name\":\"" + limt.get(h).getM_name()
									+ "\"},";
						}
					}
					str = str.substring(0, str.length() - 1);
					str += "]},";
				}
			}
			str = str.substring(0, str.length() - 1);
			str += "]},";
		}
		str = str.substring(0, str.length() - 1);
		return str;
	}
}
