class SearchsController < ApplicationController
  before_action :search_word

  def index
    render json: @words
  end

  private

  def search_word
    @words = SearchWordService.new(params[:category_id], params[:q]).search_word
  end
end
