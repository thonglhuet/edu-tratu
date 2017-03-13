class Api::OrganizationsController < ApplicationController
  def index
    render json: current_user.organizations
  end
end
