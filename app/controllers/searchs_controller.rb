class SearchsController < ApplicationController
  before_action :search_word, only: :index
  before_action :load_word, only: :show

  def index
    render json: @words
  end

  def show
    render json: @word
  end

  private

  def search_word
    @words = SearchWordService.new(params[:category_id], params[:q]).search_word
  end

  def load_word
    @word = Word.find_by id: params[:id]
  end
end
