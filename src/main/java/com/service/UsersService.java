package com.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.dao.UsersDao;
import com.entity.Users;
import com.util.MyFileUtils;
import com.util.MyWebConfig;

@Service
@Transactional
public class UsersService {

	@Resource
	UsersDao ud;

	// 注册
	public void add(Users s) {
		ud.add(s);
	}

	// 修改
	public void upd(Users s) {
		ud.upd(s);
	}

	// 删除
	public void del(Integer u_id) {
		ud.del(u_id);
	}

	// 查询所有
	public List<Users> queryAll() {
		return ud.queryAll();
	}

	// 分页查询
	public List<Users> queryPage(Integer page, Integer limit) {
		return ud.queryPage(page, limit);
	}

	// 登陆
	public List<Users> queryByName(String uname, String pwd) {
		return ud.queryByName(uname, pwd);
	}

	// 查询所有认证导师信息
	public List<Users> queryByTeacher(Integer page, Integer limit) {
		return ud.queryByTeacher(page, limit);
	}

	// 查询所有认证导师
	public List<Users> queryByTeachers() {
		return ud.queryByTeachers();
	}

	// 查询所有VIP用户
	public List<Users> queryByVIP(Integer page, Integer limit) {
		return ud.queryByVIP(page, limit);
	}

	// 查询所有VIP
	public List<Users> queryByVIPs() {
		return ud.queryByVIPs();
	}

	//
	public Users queryLog(String uname) {
		return ud.queryLog(uname);
	}

	// 根据编号查询用户是否是VIP
	public List<Users> queryVipById(String u_id) {
		return ud.queryVipById(u_id);
	}

	public List<Users> users = new ArrayList<Users>();

	private int len = 0;

	/**
	 * 判断用户是否存在用户名
	 * 
	 * @param userName
	 * @return
	 */
	public boolean checkUserName(String userName) {
		if (len == 0) {
			users = queryAll();
			len = users.size();
		}
		for (Users user : users) {
			if (user.getU_phone().equals(userName)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 根据用户查询用户密码
	 * 
	 * @param userName
	 * @return
	 */
	public String getPassword(String userName) {
		for (Users user : users) {
			if (user.getU_phone().equals(userName)) {
				return user.getU_pwd();
			}
		}
		return "";
	}

	@Resource
	MyFileUtils myFileUtils;

	@Resource
	MyWebConfig myWebConfig;

	/**
	 * 修改用户头像
	 * 
	 * @param file
	 * @return
	 */
	public String uploadPic(MultipartFile file, Users user, HttpSession session) {
		String url = "";
		try {// 将头像上传到服务器
			url = "files/" + myFileUtils.upload(myWebConfig.getPicDir(), file);
			user.setU_photo(url);
			ud.upd(user);// 执行修改操作
			session.setAttribute(user.getU_phone(), user);// 再将修改过的头像路径赋值在会话中
		} catch (Exception e) {
			e.printStackTrace();
		}
		return url;
	}

	public Integer editUserName(Users user, HttpSession session) {
		Integer rs = 0;
		try {
			Users sessionUser = (Users) session.getAttribute(user.getU_phone());
			// 将上传的用户信息赋值进session或取得对象中，然后将session对象传入修改方法，在数据库中修改
			sessionUser.setU_username(user.getU_username());
			sessionUser.setU_realname(user.getU_realname());
			sessionUser.setU_sex(user.getU_sex());
			sessionUser.setU_birthday(user.getU_birthday());
			sessionUser.setU_address(user.getU_address());
			System.out.println("intro:" + user.getU_intro());
			sessionUser.setU_intro(user.getU_intro());
			System.out.println("session:" + sessionUser);
			ud.upd(sessionUser);// 修改用户信息
			session.setAttribute(user.getU_phone(), sessionUser);
			rs = 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rs;
	}

	/**
	 * 修改用户手机号
	 * 
	 * @param phone
	 * @param session
	 * @return
	 */
	public Integer editPhone(String phone, String newPhone, HttpSession session) {
		Integer rs = 0;
		try {
			Users user = (Users) session.getAttribute(phone);
			user.setU_phone(newPhone);
			ud.upd(user);
			session.setAttribute(newPhone, user);
			rs = 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rs;
	}

	/**
	 * 修改邮箱
	 * 
	 * @param phone
	 * @param u_phone
	 * @param session
	 * @return
	 */
	public Integer editEmail(String phone, String u_email, HttpSession session) {
		Integer rs = 0;
		try {
			Users user = (Users) session.getAttribute(phone);
			user.setU_email(u_email);
			ud.upd(user);
			session.setAttribute(phone, user);
			rs = 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rs;
	}

	/**
	 * 修改密码
	 * 
	 * @param phone
	 * @param u_pwd
	 * @param session
	 * @return
	 */
	public Integer editPwd(String phone, String u_pwd, HttpSession session) {
		Integer rs = 0;
		try {
			Users user = (Users) session.getAttribute(phone);
			user.setU_pwd(u_pwd);
			ud.upd(user);
			session.setAttribute(phone, user);
			rs = 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rs;
	}

	/**
	 * 认证学员
	 * 
	 * @param phone
	 * @param user
	 * @param session
	 * @return
	 */
	public Integer editMsg(String phone, Users user, HttpSession session) {
		Integer rs = 0;
		try {
			Users sessionUser = (Users) session.getAttribute(phone);
			sessionUser.setU_address(user.getU_address());
			sessionUser.setU_sex(user.getU_sex());
			sessionUser.setU_stu_authentication(user.getU_stu_authentication());
			ud.upd(sessionUser);
			session.setAttribute(phone, sessionUser);
			rs = 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rs;
	}

	/**
	 * 获取所有布道师
	 */
	public List<Users> getUser() {
		return queryAll();
	}

	/**
	 * 添加布道师
	 * 
	 * @param user
	 * @return
	 */
	public Integer addBuDaoShi(Users user, HttpSession session) {
		Integer rs = 0;
		try {
			Users users = (Users) session.getAttribute(user.getU_phone());
			users.setU_realname(user.getU_realname());
			users.setU_phone(user.getU_phone());
			users.setU_email(user.getU_email());
			users.setU_qq(user.getU_qq());
			ud.upd(users);
			session.setAttribute(users.getU_phone(), users);
			rs = 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rs;
	}

}
