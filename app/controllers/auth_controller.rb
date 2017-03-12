class AuthController < ApplicationController
  def index
    if user_signed_in?
      render json: {signed_in: true, user: current_user}
    else
      render json: {signed_in: false}
    end
  end
end
