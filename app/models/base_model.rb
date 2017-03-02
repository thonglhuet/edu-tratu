module BaseModel
  extend ActiveSupport::Concern

  included do
    class << self
      def table_name_prefix
        "m_" if name.first(3) == "M::"
      end
    end
  end
end
