class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  include ApplicationHelper
  before_action :configure_permitted_parameters, if: :devise_controller?

  def logged_in_user
    return true if user_signed_in?
    flash["danger"] = t "danger_err_login"
    redirect_to new_user_session_path
  end

  def verify_admin
    unless current_user.admin?
      flash["danger"] = t "danger_not_admin"
      redirect_to root_path
    end
  end

  def after_sign_in_path_for resource
    if resource.admin?
      admin_root_path
    else
      session[:previous_url] || root_path
    end
  end

  rescue_from CanCan::AccessDenied do
    flash["alert"] = t "error_denied"
    redirect_to root_path
  end

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
       user_params.permit :name, :email, :password, :password_confirmation
    end
  end

  class NullDictionary
    def words
      {}
    end
  end

  def not_found
    raise ActionController::RoutingError.new("Not Found")
  end
end
