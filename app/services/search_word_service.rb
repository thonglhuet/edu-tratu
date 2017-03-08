class SearchWordService
  attr_accessor :category_id, :word

  def initialize category_id, word
    @category_id = category_id
    @word = word
  end

  def search_word
    if @category_id.present?
      @words = Word.sought @word, @category_id
    else
      @words = " "
    end
  end
end
