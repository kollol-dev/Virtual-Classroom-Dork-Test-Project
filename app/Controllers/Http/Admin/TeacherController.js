"use strict";

// Models
const Admin = use("App/Models/Admin");
const Teacher = use("App/Models/Teacher");

// Plugins & Exceptions
const CustomException = use("App/Exceptions/CustomException");
const { validate } = use("Validator");
const {
  pagination,
  generateRandomString,
  sendEmail,
} = require("../../../Modules/Common");
const Hash = use("Hash");
class TeacherController {
  async paginateTeachers({ request, response }) {
    let page = request.input("page", 1);

    return response.status(201).json({
      status: "Success",
      response: Teacher.query()
        .orderBy("id", "desc")
        .paginate(page, pagination),
    });
  }

  async addNewTeacher({ request, response }) {
    // if (!request.body.fullName) {
    //   return response.status(401).json({
    //     message: "Invalid Request",
    //   });
    // }

    // generate password for teacher
    let password = generateRandomString(12);


    let teacher = await Teacher.create({
      fullName: request.body.fullName,
      email: request.body.email,
      password: await Hash.make(password),
    });

    // send email
    let emailbody = `<table border=0 cellpadding=0 cellspacing=0 width=100% style=table-layout:fixed;background-color:#f9f9f9 id=bodyTable><tr><td style=padding-right:10px;padding-left:10px align=center valign=top id=bodyCell><table border=0 cellpadding=0 cellspacing=0 width=100% class=wrapperWebview style=max-width:600px><tr><td align=center valign=top><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td style=padding-top:20px;padding-bottom:20px;padding-right:0 align=right valign=middle class=webview><a href=# style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:right;text-decoration:underline;padding:0;margin:0"target=_blank class="text hideOnMobile">Oh wait, there's more! →</a></table></table><table border=0 cellpadding=0 cellspacing=0 width=100% class=wrapperBody style=max-width:600px><tr><td align=center valign=top><table border=0 cellpadding=0 cellspacing=0 width=100% class=tableCard style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px"><tr><td style=background-color:#00d2f4;font-size:1px;line-height:3px class=topBorder height=3> <tr><td style=padding-top:60px;padding-bottom:20px align=center valign=middle class=emailLogo><a href=# style=text-decoration:none target=_blank><img alt=""border=0 src=http://email.aumfusion.com/vespro/img/hero-img/blue/logo.png style=width:100%;max-width:150px;height:auto;display:block width=150></a><tr><td style=padding-bottom:20px align=center valign=top class=imgHero><a href=# style=text-decoration:none target=_blank><img alt=""border=0 src=http://email.aumfusion.com/vespro/img/hero-img/blue/heroGradient/user-account.png style=width:100%;max-width:600px;height:auto;display:block;color:#f9f9f9 width=600></a><tr><td style=padding-bottom:5px;padding-left:20px;padding-right:20px align=center valign=top class=mainTitle><h2 class=text style=color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0>Hi ${request.body.fullName}</h2><tr><td style=padding-bottom:30px;padding-left:20px;padding-right:20px align=center valign=top class=subTitle><tr><td style=padding-left:20px;padding-right:20px align=center valign=top class="containtTable ui-sortable"><table border=0 cellpadding=0 cellspacing=0 width=100% class=tableDescription><tr><td style=padding-bottom:20px align=center valign=top class=description><p class=text style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">An admin has created account for you at Virtual Classroom. Your login password is following:</table><table border=0 cellpadding=0 cellspacing=0 width=100% class=tableButton><tr><td style=padding-top:20px;padding-bottom:20px align=center valign=top><table border=0 cellpadding=0 cellspacing=0 align=center><tr><td style="background-color:#00d2f4;padding:12px 35px;border-radius:50px"align=center class=ctaButton><p class=text style=color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-decoration:none;display:block>${password}</table></table><tr><td style=font-size:1px;line-height:1px height=20> <tr><td style=padding-bottom:40px align=center valign=middle class=emailRegards><a href=# style=text-decoration:none target=_blank><img alt=""border=0 src=http://email.aumfusion.com/vespro/img//other/signature.png style=width:100%;max-width:150px;height:auto;display:block width=150 mc:edit=signature></a></table><table border=0 cellpadding=0 cellspacing=0 width=100% class=space><tr><td style=font-size:1px;line-height:1px height=30> </table></table><table border=0 cellpadding=0 cellspacing=0 width=100% class=wrapperFooter style=max-width:600px><tr><td align=center valign=top><table border=0 cellpadding=0 cellspacing=0 width=100% class=footer><tr><td style=padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px align=center valign=top class=socialLinks><a href=#facebook-link style=display:inline-block target=_blank class=facebook><img alt=""border=0 src=http://email.aumfusion.com/vespro/img/social/light/facebook.png style=height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px width=40> </a><a href=#twitter-link style=display:inline-block target=_blank class=twitter><img alt=""border=0 src=http://email.aumfusion.com/vespro/img/social/light/twitter.png style=height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px width=40> </a><a href=#pintrest-link style=display:inline-block target=_blank class=pintrest><img alt=""border=0 src=http://email.aumfusion.com/vespro/img/social/light/pintrest.png style=height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px width=40> </a><a href=#instagram-link style=display:inline-block target=_blank class=instagram><img alt=""border=0 src=http://email.aumfusion.com/vespro/img/social/light/instagram.png style=height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px width=40> </a><a href=#linkdin-link style=display:inline-block target=_blank class=linkdin><img alt=""border=0 src=http://email.aumfusion.com/vespro/img/social/light/linkdin.png style=height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px width=40></a><tr><td style="padding:10px 10px 5px"align=center valign=top class=brandInfo><p class=text style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">© Vespro Inc. | 800 Broadway, Suite 1500 | New York, NY 000123, USA.<tr><td style="padding:0 10px 20px"align=center valign=top class=footerLinks><p class=text style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0"><a href=# style=color:#bbb;text-decoration:underline target=_blank>View Web Version </a> |  <a href=# style=color:#bbb;text-decoration:underline target=_blank>Email Preferences </a> |  <a href=# style=color:#bbb;text-decoration:underline target=_blank>Privacy Policy</a><tr><td style="padding:0 10px 10px"align=center valign=top class=footerEmailInfo><p class=text style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">If you have any quetions please contact us <a href=# style=color:#bbb;text-decoration:underline target=_blank>support@mail.com.</a><br><a href=# style=color:#bbb;text-decoration:underline target=_blank>Unsubscribe</a> from our mailing lists<tr><td style=padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px align=center valign=top class=appLinks><a href=#Play-Store-Link style=display:inline-block target=_blank class=play-store><img alt=""border=0 src=http://email.aumfusion.com/vespro/img/app/play-store.png style=height:auto;margin:5px;width:100%;max-width:120px width=120> </a><a href=#App-Store-Link style=display:inline-block target=_blank class=app-store><img alt=""border=0 src=http://email.aumfusion.com/vespro/img/app/app-store.png style=height:auto;margin:5px;width:100%;max-width:120px width=120></a><tr><td style=font-size:1px;line-height:1px height=30> </table><tr><td style=font-size:1px;line-height:1px height=30> </table></table>`;
    sendEmail(request.body.email, emailbody);

    return response.status(201).json({
      status: "Success",
      message: "Teacher has been created successfully.",
      response: teacher,
    });
  }

  async editTeacherByTeacherId({ request, response, params }) {
    const rules = {
      name: "required",
    };

    const validation = await validate(request.all(), rules);
    if (validation.fails()) {
      return response.status(403).json({
        success: false,
        message: "Invalid Request!",
      });
    }
    let category = await Category.query().where("id", params.id).update({
      name: request.body.name,
    });
    if (category)
      return response.status(201).json({
        success: true,
        message: "Category edited successfully",
      });
    return response.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }

  async deleteTeacherByTeacherId({ params, response }) {
    let deleteCheck = await Category.query().where("id", params.id).delete();
    if (deleteCheck)
      return response.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });

    return response.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

module.exports = TeacherController;
