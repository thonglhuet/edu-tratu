class Admin::DeletesController < ApplicationController
  before_action :authenticate_user!, :verify_admin
  before_action :load_user, only: :show
  layout "admin"

  def show
    authorize! :delete, @user
    @organizations = Organization.search_organization params[:user_id]
  end

  private

  def load_user
    @user = User.find_by id: params[:user_id] || NullUser.new
    not_found unless @user
  end
end
