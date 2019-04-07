package com.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Skill_Ask;
import com.service.Skill_AskService;

@Controller
@RequestMapping("skill_ask")
public class Skill_AskController {
	
	@Resource
	Skill_AskService ss;
	
	Integer rs;
	Integer pageNum;
	
	// 添加技术问答
	@RequestMapping("add")
	@ResponseBody
	public Integer add(Skill_Ask sa){
		ss.add(sa);
		rs = 1;
		return rs;
	}
	
	// 分页查询所有的技术问答信息
	@RequestMapping("querySkill_ask")
	@ResponseBody
	public List<Map<String,Object>> querySkill_ask(Integer page,Integer limit,Model model){
		if(null == page || page < 0){
			page = 1;
		}
		limit = 10;
		return ss.querySkill_ask((page-1)*limit, limit);
	}
	
	// 分页查询所有技术问答信息
	@RequestMapping("queryByPage")
	@ResponseBody
	public Map<String,Object> queryByPage(Integer page,Integer limit){
		List<Skill_Ask> list = ss.queryAll();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("msg", "");
		map.put("code", 0);
		map.put("count", list.size());
		map.put("data", ss.querySkill_ask((page-1)*limit, limit));
		return map;
	}
	
	// 根据编号查询当前技术问答信息
	@RequestMapping("querySkill_askByid")
	@ResponseBody
	public List<Map<String,Object>> querySkill_askByid(Integer s_id){
		return ss.querySkill_askByid(s_id);
	}
	
	// 查询所有的条数并且返回
	@RequestMapping("queryBy")
	@ResponseBody
	public Integer queryBy(){
		Integer counts = ss.queryAll().size();
		if(counts < 10){
			pageNum = 1;
		}else if(counts > 10){
			if(counts % 10 == 0){
				pageNum = counts / 10;
			}else{
				pageNum = counts / 10 + 1;
			}
		}
		return pageNum;
	}
}
