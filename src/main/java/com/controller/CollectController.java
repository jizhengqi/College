package com.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Collect;
import com.entity.Curriculum;
import com.service.CollectService;

@Controller
@RequestMapping("collect")
public class CollectController {

	@Resource
	CollectService cs;

	Integer rs;

	// 查询当前用户是否关注了当前课程,如果没有则关注,有的话取消关注
	@RequestMapping("queryByCollect")
	@ResponseBody
	public Integer queryByCollect(String u_id, Integer c_id, Integer v_id) {
		List<Collect> list = cs.queryByCollect(u_id, c_id, v_id);
		if (list.size() > 0) {
			cs.del(u_id, c_id, v_id);
			rs = 1;
		} else {
			cs.add(u_id, c_id, v_id);
			rs = 2;
		}
		return rs;
	}
	
	// 查询用户所有的收藏信息
	@RequestMapping("queryByU_id")
	@ResponseBody
	public List<Curriculum> queryByU_id(String u_id){
		List<Curriculum> list = cs.queryByU_id(u_id);
		return list;
	}

}
