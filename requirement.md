## Requirement

## BUSINESS REQUIREMENT (CATEGORY A):   

### **BR (A.1): Development Stack [Coverage: Week 1]**

The new Web Application must be developed using VueJS 3 framework.

### **BR (A.2): Responsiveness** 

The new Web Application must have responsiveness capability to be compatible with various devices.

***\*Hint:\** Responsiveness can be achieved using [Bootstrap](https://getbootstrap.com/), [Materialize CSS](https://materializecss.com/) or any other Framework**

---

## BUSINESS REQUIREMENT (CATEGORY B):  

### **BR (B.1): Validations**

The new Web Application must implement user input validations with a minimum of two different types of validations. 

### **BR (B.2): Dynamic Data**   

The new Web Application must be able to dynamically fetch and displays values from the underlying JavaScript data structures (e.g. fetched from JSON, State variables or vue binding). 

HINT: Use Local Storage to persist data beyond the current session. [*Example*](https://www.geeksforgeeks.org/how-to-make-localstorage-reactive-in-vue-js/).

---

## BUSINESS REQUIREMENT (CATEGORY C):

**BR (C.1): Authentication**   

The new Web Application must have a basic authentication mechanism (login/register functionality and user accounts) to provide confidentiality.

**BR (C.2): Role-based authentication**

The new Web Application must have a role-based authentication mechanism (supporting different types of users) with a minimum of two roles to support different authorisation levels on pages.

**BR (C.3): Rating**

The new Web Application must implement an aggregated rating score feature. Users can rate and see the average rating from all users for a particular aspect (Such as Reviews).

**BR (C.4): Security**

The new Web Application must implement basic security to protect from online attacks such as XSS. Also needs to follow basic security practices (e.g. implementing client-side data validation).

---

## Rubric

| **Grading Level** **(You shall only proceed to do next grade level when all your previous level has reached exceeds expectations** | **Criteria**                                   | **Exceeds Expectations**                                     | **Meets Expectations**                                       | **Needs Improvement**                                        | **Fail to Meet Expectations**                                |
| ------------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **P - P++**                                                  | **BR (A.1): Development Stack** **and Coding** | The web application is developed using the latest version of Vue.JS (3.x) and demonstrates a strong understanding of the framework's core concepts and features. The code is well-structured, modular, and follows best practices. | The web application is developed using Vue.JS 3, but the implementation may lack some advanced features or best practices. The code is functional but could be improved in terms of structure and organization. | The web application is not developed using Vue.JS 3 or the implementation is significantly flawed, lacking key features or best practices. | The Vue.js 3 framework is not used, or its implementation is severely flawed. |
|                                                              | **BR (A.2): Responsiveness**                   | The web application is highly responsive and adapts seamlessly to various device sizes and screen resolutions. All UI elements, layout, and functionality are optimized for both desktop and mobile experiences. (Which can fit for situations that has screen pixels less than 576px, between 576px to 768px , between 992px to 1200px and bigger than 1400px) | The web application is generally responsive, but there may be some minor issues or inconsistencies in the layout and functionality across different devices. (Which can fit for situations that has screen pixels less than 576px and bigger than 1400px) | The web application lacks responsiveness, and the user experience is significantly compromised on different devices. (Which can fit for situations that has screen pixels bigger than 1400px) | The web application lacks responsiveness and does not work well on different devices and screen sizes at all |
| **C - D++**                                                  | **BR (B.1): Validations**                      | The web application implements a comprehensive set of user input validations, including at least two different types (e.g., required fields, email format, number range, etc.). The validations are well-designed, provide clear feedback to the user, and enhance the overall user experience. | The web application implements at least two different types of user input validations, but the implementation may have some minor issues or lack in providing clear feedback to the user. | The web application lacks or has significant issues with the implementation of user input validations (both at client and server-side), compromising the overall user experience. | The web application does not implement any user input validations. |
|                                                              | **BR (B.2): Dynamic Data & Data Structure**    | The web application seamlessly fetches and displays dynamic data from underlying JavaScript data structures (e.g., fetched from JSON, state variables, or Vue binding). The data is presented in a clear and intuitive manner, enhancing the user experience. | The web application fetches and displays dynamic data from internal JS data structures, but the implementation may have some minor issues or lack in providing a smooth user experience. | The web application fails to fetch or display dynamic data from internal JS data structures correctly, or the implementation is significantly flawed, compromising the user experience. | The web application does not dynamically fetch or display any data and contains hard coded data |
| **HD - HD++**                                                | **BR (C.1): Authentication**                   | The web application implements a basic authentication mechanism, including both login and registration functionality that supports multiple users using underlying data structures and storage features. The user accounts are properly managed, and the application provides a seamless and secure user experience. | The web application tries to implement a basic authentication mechanism (e.g. hard coded values), but the implementation may have some minor issues or lack in providing a secure user experience. | -                                                            | The web application does not have any authentication mechanism. |
|                                                              | **BR (C.2): Role-based authentication**        | The web application implements a comprehensive role-based authentication mechanism, supporting at least two distinct user roles with appropriate authorization levels and access control on different pages. The implementation is well-designed and enhances the overall security and user experience. | -                                                            | The web application implements a basic role-based authentication mechanism (e.g. only have one role, no access control considered for roles), but the implementation may have some minor issues or lack in providing a clear and secure user experience. | The web application does not have any role-based authentication mechanism. |
|                                                              | **BR (C.3): Rating**                           | The web application implements a robust and intuitive rating feature, allowing users to rate and view the aggregated rating score for a particular aspect (e.g., reviews). The implementation is well-designed, provides clear feedback to the user, and enhances the overall user experience. | The web application implements a basic rating feature (e.g. Rating does not perform aggregated calculations, only text based rating), but the implementation may have some minor issues or lack in providing a smooth user experience. | The web application lacks or has significant issues with the implementation of the rating feature, compromising the overall user experience. | The web application does not have any rating system.         |
|                                                              | **BR (C.4): Security**                         | The web application implements comprehensive security measures, including protection against XSS attacks and following best practices (e.g., not storing API keys in client-side code, implementing both server and client-side data validation). The security implementation is well-designed and enhances the overall application security. | The web application implements some basic security measures (e.g. XSS), but the implementation may have some minor issues or lack in providing a fully secure user experience. | The web application lacks or has significant issues with the implementation of security measures, compromising the overall application security and user experience. | The web application does not have any security measures in place. |

---

## 需求

## 业务需求（类别 A）：

### **BR (A.1): 开发栈 [覆盖范围：第1周]**

新的Web应用程序必须使用 VueJS 3 框架开发。

### **BR (A.2): 响应性**

新的Web应用程序必须具备响应性能力，以便与各种设备兼容。

***\*提示：\** 可以使用 [Bootstrap](https://getbootstrap.com/)、[Materialize CSS](https://materializecss.com/) 或其他框架实现响应性***

---

## 业务需求（类别 B）：

### **BR (B.1): 验证**

新的Web应用程序必须实现用户输入验证，至少包括两种不同类型的验证。

### **BR (B.2): 动态数据**

新的Web应用程序必须能够动态地从底层 JavaScript 数据结构（例如，从 JSON、状态变量或 vue 绑定中获取）获取并显示值。

提示：使用本地存储在当前会话之外持久保存数据。[**示例**](https://www.geeksforgeeks.org/how-to-make-localstorage-reactive-in-vue-js/).

---

## 业务需求（类别 C）：

**BR (C.1): 身份验证**

新的Web应用程序必须具有基本的身份验证机制（登录/注册功能和用户账户），以提供机密性。

**BR (C.2): 基于角色的身份验证**

新的Web应用程序必须具有基于角色的身份验证机制（支持不同类型的用户），并至少包含两种角色以支持页面上不同的授权级别。

**BR (C.3): 评分**

新的Web应用程序必须实现聚合评分功能。用户可以对特定方面（如评论）进行评分，并查看所有用户的平均评分。

**BR (C.4): 安全**

新的Web应用程序必须实施基本安全措施，以防范线上攻击，如 XSS。还需要遵循基本的安全实践（例如，实施客户端数据验证）。

---

## 评分标准

| **评分级别（只有在你前一级别达到超出预期时才能进行下一级别的评分）** | **评价标准**                     | **超出预期**                                                 | **符合预期**                                                 | **需要改进**                                                 | **未达到预期**                                          |
| ------------------------------------------------------------ | -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------- |
| **P - P++**                                                  | **BR (A.1): 开发栈和编码**       | Web应用程序使用最新版本的Vue.JS（3.x）开发，并展示了对框架核心概念和功能的深刻理解。代码结构良好，模块化，并遵循最佳实践。 | Web应用程序使用Vue.JS 3开发，但实现可能缺乏一些高级功能或最佳实践。代码功能性良好，但在结构和组织上可以改进。 | Web应用程序未使用Vue.JS 3开发，或实现有重大缺陷，缺少关键功能或最佳实践。 | Web应用程序未使用Vue.js 3框架，或其实现存在严重缺陷。   |
|                                                              | **BR (A.2): 响应性**             | Web应用程序具有很高的响应性，能够无缝适应各种设备尺寸和屏幕分辨率。所有UI元素、布局和功能都针对桌面和移动体验进行了优化。（适应屏幕像素小于576px，576px到768px之间，992px到1200px之间以及大于1400px的情况） | Web应用程序通常具有响应性，但在不同设备上的布局和功能可能存在一些小问题或不一致。（适应屏幕像素小于576px和大于1400px的情况） | Web应用程序缺乏响应性，不同设备上的用户体验显著受损。（适应屏幕像素大于1400px的情况） | Web应用程序缺乏响应性，在不同设备和屏幕尺寸上表现不佳。 |
| **C - D++**                                                  | **BR (B.1): 验证**               | Web应用程序实现了全面的用户输入验证，包括至少两种不同类型（例如，必填字段、电子邮件格式、数字范围等）。验证设计良好，为用户提供清晰的反馈，增强了整体用户体验。 | Web应用程序实现了至少两种不同类型的用户输入验证，但实现可能存在一些小问题或未能提供清晰的用户反馈。 | Web应用程序缺乏或在实现用户输入验证（客户端和服务器端）方面存在重大问题，损害了整体用户体验。 | Web应用程序未实现任何用户输入验证。                     |
|                                                              | **BR (B.2): 动态数据和数据结构** | Web应用程序无缝地从底层JavaScript数据结构（例如，从JSON、状态变量或Vue绑定中获取）获取并显示动态数据。数据以清晰直观的方式呈现，增强了用户体验。 | Web应用程序从内部JS数据结构获取并显示动态数据，但实现可能存在一些小问题或无法提供流畅的用户体验。 | Web应用程序未能正确地从内部JS数据结构获取或显示动态数据，或实现存在重大缺陷，损害了用户体验。 | Web应用程序未动态获取或显示任何数据，包含硬编码数据。   |
| **HD - HD++**                                                | **BR (C.1): 身份验证**           | Web应用程序实现了基本的身份验证机制，包括登录和注册功能，支持多用户使用底层数据结构和存储功能。用户账户得到妥善管理，应用程序提供了无缝且安全的用户体验。 | Web应用程序尝试实现基本的身份验证机制（例如硬编码值），但实现可能存在一些小问题或在提供安全的用户体验方面存在不足。 | -                                                            | Web应用程序没有任何身份验证机制。                       |
|                                                              | **BR (C.2): 基于角色的身份验证** | Web应用程序实现了全面的基于角色的身份验证机制，支持至少两种不同用户角色，具有适当的授权级别和页面访问控制。实现设计良好，增强了整体安全性和用户体验。 | -                                                            | Web应用程序实现了基本的基于角色的身份验证机制（例如，只有一个角色，未考虑角色的访问控制），但实现可能存在一些小问题或在提供清晰和安全的用户体验方面存在不足。 | Web应用程序没有任何基于角色的身份验证机制。             |
|                                                              | **BR (C.3): 评分**               | Web应用程序实现了一个强大且直观的评分功能，允许用户对特定方面（例如，评论）进行评分并查看聚合评分。实现设计良好，为用户提供清晰的反馈，增强了整体用户体验。 | Web应用程序实现了基本的评分功能（例如，评分不进行聚合计算，只基于文本评分），但实现可能存在一些小问题或无法提供流畅的用户体验。 | Web应用程序缺乏或在实现评分功能方面存在重大问题，损害了整体用户体验。 | Web应用程序没有任何评分系统。                           |
|                                                              | **BR (C.4): 安全**               | Web应用程序实现了全面的安全措施，包括防止XSS攻击和遵循最佳实践（例如，不在客户端代码中存储API密钥，实现服务器端和客户端数据验证）。安全实施设计良好，增强了整体应用安全性。 | Web应用程序实施了一些基本的安全措施（例如XSS），但实现可能存在一些小问题或在提供完全安全的用户体验方面存在不足。 | Web应用程序缺乏或在实施安全措施方面存在重大问题，损害了整体应用安全性和用户体验。 | Web应用程序没有实施任何安全措施。                       |

---