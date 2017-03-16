class Admin::UsersController < ApplicationController
  load_and_authorize_resource
  before_action :authenticate_user!, :verify_admin
  before_action :load_user, only: :destroy
  layout "admin"

  def index
    @users = User.select(:id, :name, :email, :created_at, :role).page(params[:page])
      .per Settings.organizations.per_page
  end

  def show
  end

  def destroy
    @organizations = Organization.search_organization params[:id]
    if delete_user_and_organization
      flash[:success] = t ".delete_success"
    else
      flash[:danger] = t ".delete_error"
    end
    redirect_to admin_users_url
  end

  private

  def load_user
    @user = User.find_by id: params[:id] || NullUser.new
    not_found unless @user
  end

  def delete_user_and_organization
    ActiveRecord::Base.transaction do
      @organizations.destroy_all
      @user.destroy
      raise ActiveRecord::Rollback unless @organizations.empty? && @user.destroyed?
    end
    @organizations.empty? && @user.destroyed? ? true : false
  end
end
