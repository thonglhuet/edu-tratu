class OrganizationsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_organization, only: :destroy
  before_action :load_list_organizations, only: :index

  def index
  end

  def destroy
    if @organization.destroy
      render json: load_list_organizations
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  private

  def load_organization
    @organization = Organization.find_by id: params[:id]
  end

  def load_list_organizations
    @organizations = current_user.organization.select :id, :name, :created_at
  end
end
