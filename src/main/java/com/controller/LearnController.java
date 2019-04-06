package com.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Learn;
import com.service.LearnService;

@Controller
@RequestMapping("learn")
public class LearnController {

	@Resource
	LearnService ls;

	Integer rs;

	// 添加正在学习的课程信息
	@RequestMapping("add")
	@ResponseBody
	public Integer add(Learn l) {
		List<Learn> list = ls.queryByAll(l);
		if (list.size() > 0) {
			rs = 1;
		} else {
			ls.add(l);
			rs = 1;
		}
		return rs;
	}

	// 查询某个用户的查看历史
	@RequestMapping("queryByU_id")
	@ResponseBody
	public List<Learn> queryByU_id(Integer u_id) {
		List<Learn> list = ls.queryAll(u_id);
		return list;
	}

	/**
	 * 查询学习的课程根据用户ID和课程ID
	 * 
	 * @param u_id
	 * @param c_id
	 * @return
	 */
	@RequestMapping("getLearn")
	@ResponseBody
	public Learn getLearnByU_idAndC_id(String u_id, Integer c_id) {
		return ls.getLearnByU_idAndC_id(u_id, c_id);
	}
}
