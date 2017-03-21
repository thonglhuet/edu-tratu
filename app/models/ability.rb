class Ability
  include CanCan::Ability

  def initialize user
    user ||= User.new
    case user.role
    when "admin"
      can :manage, :all
    when "user"
      can :manage, [Category, Dictionary, Bookmark, Organization, Review,
        SharedDictionary]
    else
      can :read, [Dictionary, Organization]
    end
  end
end
