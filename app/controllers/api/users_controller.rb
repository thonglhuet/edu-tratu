class Api::UsersController < ApplicationController
  def index
    if params[:q] && !params[:q].empty?
      render json: User.sought(params[:q], current_user.id)
    else
      render json: []
    end
  end
end
