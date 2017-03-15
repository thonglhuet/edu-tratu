class OrganizationsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_organization, only: [:edit, :update, :destroy]
  before_action :load_list_organizations, only: :index

  def index
  end

  def edit
    render json: @organization
  end

  def create
    @organization = Organization.new organization_params
    if @organization.save
      @organization.create_organization_owner current_user
      render json: load_list_organizations
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  def update
    if @organization.update_attributes organization_params
      render json: load_list_organizations
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
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
    @organizations = current_user.organizations.select :id, :name, :created_at
  end

  def organization_params
    params.require(:organization).permit Organization::ATTR_PARAMS
  end
end
