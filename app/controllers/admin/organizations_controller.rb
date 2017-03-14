class Admin::OrganizationsController < ApplicationController
  before_action :authenticate_user!, :verify_admin
  layout "admin"

  def index
    @search = Organization.search params[:q]
    @organizations = @search.result.select(:id, :name, :created_at)
                            .order(created_at: :DESC)
                            .includes(:users)
                            .page(params[:page]).per Settings.organizations.per_page
  end
end
